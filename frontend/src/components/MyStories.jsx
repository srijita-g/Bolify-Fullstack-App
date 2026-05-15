import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import API from "../api"

function MyStories() {

    const [posts, setPosts] = useState([])

    useEffect(() => {

        fetchPosts()

    }, [])

    async function fetchPosts() {

    try {

        const token = localStorage.getItem("token")

        const res = await API.get(
            "/posts",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        setPosts(res.data)

    } catch (error) {

        console.log(error)
    }
}

    async function deletePost(id) {

        try {

            const token = localStorage.getItem("token")

            await API.delete(
                `/posts/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setPosts(
                posts.filter(
                    (post) => post.id !== id
                )
            )

        } catch (error) {

            console.log(error)

            alert("Delete Failed")
        }
    }

    return (

        <div className="stories-page container">

            <div className="stories-header">

                <h1>
                    My Stories ✨
                </h1>

                <p>
                    Your thoughts, ideas and creativity -- all in one place
                </p>

            </div>

            <div className="stories-top-bar">

                <div className="story-count">

                    {posts.length} Stories Published

                </div>

                <Link to="/create">

                    <button className="new-blog-btn">

                        + Create New Blog

                    </button>

                </Link>

            </div>

            <div className="stories-list">

                {
                    posts.map((post) => (

                        <div
                            className="story-card"
                            key={post.id}
                        >

                            <div className="story-top">

                                <span className="story-tag">
                                    Story
                                </span>

                                <div className="story-actions">

                                <Link to={`/edit/${post.id}`}>

                                    <button className="edit-btn">
                                        Edit
                                    </button>

                                </Link>

                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        deletePost(post.id)
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                            </div>

                            <h2>
                                {post.title}
                            </h2>

                            <p>
                                {post.content}
                            </p>

                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default MyStories