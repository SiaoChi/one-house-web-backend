from typing import Union, Optional, Any
from fastapi import FastAPI, Request
from src.config.firebase_db import db
from fastapi.responses import JSONResponse
from datetime import datetime, timezone
import pytz
from firebase_admin import firestore
from firebase_admin.firestore import FieldFilter

app = FastAPI()
tw_zone = pytz.timezone('Asia/Taipei')


@app.post("/")
def read_root() -> dict:
    return {"Hello": "One House Website"}


@app.get("/projects", status_code=200)
async def get_projects(category: str = None, page: int = None) -> Union[list, None, dict]:
    try:
        query = db.collection('one-house')
        query = query.order_by(
            "timestamp", direction=firestore.Query.DESCENDING)

        if category:
            query = (query
                     .where(filter=FieldFilter('category', '==', category))
                     #  .where('timestamp', ">=", 1719731381) # timestamp index尚未建立
                     )

        if page is not None:
            page_limit = 10
            skip = (page - 1) * page_limit
            docs = query.limit(page_limit).offset(skip).stream()
        else:
            docs = query.stream()

        projects = [doc.to_dict() for doc in docs]

        return projects
    except Exception as e:
        return JSONResponse(status_code=400, content={"message": str(e)})


@ app.post("/projects", status_code=200)
async def create_projects(request: Request) -> Optional[dict[str, Any]]:
    try:
        body = await request.json()
        timestamp = int(datetime.now(timezone.utc).timestamp())
        created_at = datetime.now(tw_zone).strftime("%Y-%m-%d %H:%M:%S")

        for project in body:

            project.update({
                "created_at": created_at,
                "timestamp": timestamp,
            })
            doc_ref = db.collection('one-house')
            doc_ref.add(project)
        return {"message": "Successfully created projects"}
    except Exception as e:
        return JSONResponse(status_code=400, content={"message": str(e)})


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8080, reload=True)
