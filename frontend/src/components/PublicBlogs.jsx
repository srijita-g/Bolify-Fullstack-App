import { useEffect, useState } from "react"
import API from "../api"

function PublicBlogs() {

    const [posts, setPosts] = useState([])

    useEffect(() => {

        fetchPosts()

    }, [])

    async function fetchPosts() {

        try {

            const res = await API.get("/public-posts")

            setPosts(res.data)

        } catch (error) {

            console.log(error)
        }
    }

    return (

        <div className="stories-page container">

            <div className="stories-header">

                <h1>
                    Public Blogs 🌍
                </h1>

                <p>
                    Explore stories shared by everyone
                </p>

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
                                    Public Story
                                </span>

                            </div>

                            <h2>
                                {post.title}
                            </h2>

                            <p>
                                {post.content}
                            </p>

                            <div className="story-author">

                                ✍️ @{post.username}

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default PublicBlogs