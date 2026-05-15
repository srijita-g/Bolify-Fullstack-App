from pydantic import BaseModel

# ---------- USER ----------

class UserCreate(BaseModel):
    username: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


# ---------- POSTS ----------

class PostCreate(BaseModel):
    title: str
    content: str


class PostResponse(PostCreate):

    id: int

    class Config:
        from_attributes = True