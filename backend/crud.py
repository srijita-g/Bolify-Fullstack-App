from sqlalchemy.orm import Session

from models import User, Post

from auth import hash_password


# ---------- USER ----------

def create_user(
    db: Session,
    username: str,
    password: str
):

    hashed_password = hash_password(password)

    user = User(
        username=username,
        password=hashed_password
    )

    db.add(user)

    db.commit()

    db.refresh(user)

    return user


def get_user_by_username(
    db: Session,
    username: str
):

    return db.query(User).filter(
        User.username == username
    ).first()


# ---------- POSTS ----------

def create_post(
    db: Session,
    title: str,
    content: str,
    owner_id: int
):

    post = Post(
        title=title,
        content=content,
        owner_id=owner_id
    )

    db.add(post)

    db.commit()

    db.refresh(post)

    return post


def get_posts(db: Session):

    return db.query(Post).all()