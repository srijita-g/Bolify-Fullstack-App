from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException

import models
import schemas
import crud

from database import engine, SessionLocal

from auth import (
    verify_password,
    create_access_token,
    get_current_user
)

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# ---------- CORS ----------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- DATABASE ----------

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# ---------- ROOT ----------

@app.get("/")
def root():

    return {
        "message": "Blog API Running"
    }


# ---------- REGISTER ----------

@app.post("/register")
def register(
    user: schemas.UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = crud.get_user_by_username(
        db,
        user.username
    )

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    crud.create_user(
        db,
        user.username,
        user.password
    )

    return {
        "message": "User registered successfully"
    }


# ---------- LOGIN ----------

@app.post("/login")
def login(
    user: schemas.UserLogin,
    db: Session = Depends(get_db)
):

    db_user = crud.get_user_by_username(
        db,
        user.username
    )

    if not db_user:

        raise HTTPException(
            status_code=400,
            detail="Invalid username"
        )

    if not verify_password(
        user.password,
        db_user.password
    ):

        raise HTTPException(
            status_code=400,
            detail="Invalid password"
        )

    access_token = create_access_token(
        data={"sub": db_user.username}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


# ---------- CREATE POST ----------

@app.post("/posts")
def create_new_post(
    post: schemas.PostCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    new_post = crud.create_post(
        db,
        post.title,
        post.content,
        current_user.id
    )

    return new_post

# ---------- GET POSTS ----------

@app.get("/posts")
def get_posts(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    posts = db.query(models.Post).filter(
        models.Post.owner_id == current_user.id
    ).all()

    return posts


@app.delete("/posts/{post_id}")
def delete_post(post_id: int, db: Session = Depends(get_db)):

    post = db.query(models.Post).filter(
        models.Post.id == post_id
    ).first()

    if not post:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    db.delete(post)
    db.commit()

    return {
        "message": "Post deleted"
    }

@app.put("/posts/{id}")
def update_post(
    id: int,
    updated_post: schemas.PostCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    post = db.query(models.Post).filter(
        models.Post.id == id,
        models.Post.owner_id == current_user.id
    ).first()

    if not post:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    post.title = updated_post.title
    post.content = updated_post.content

    db.commit()

    return {"message": "Post updated"}

@app.get("/all-posts")
def get_all_posts(
    db: Session = Depends(get_db)
):

    posts = db.query(models.Post).all()

    return posts

@app.get("/public-posts")
def get_public_posts(
    db: Session = Depends(get_db)
):

    posts = db.query(models.Post).all()

    result = []

    for post in posts:

        result.append({
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "username": post.owner.username
        })

    return result