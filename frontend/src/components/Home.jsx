import { useEffect, useState } from "react"

import API from "../api"

function Home() {

    const [posts, setPosts] = useState([])

    useEffect(() => {

        fetchPosts()

    }, [])

    async function fetchPosts() {

        try {

            const res = await API.get(
                "/all-posts"
            )

            setPosts(res.data)

        } catch (error) {

            console.log(error)
        }
    }

    function handleStartSharing() {

        const token = localStorage.getItem("token")

        if (token) {

            window.location.href = "/mystories"

        } else {

            window.location.href = "/login"
        }
    }

    return (

        <div className="container">

            <div className="hero">

                <div className="hero-glow"></div>

                <h1>
                    Share Your Ideas
                    <br />
                    With The World
                </h1>

                <p className="typing-text">
                    Write your story, inspire people, and express yourself.
                </p>

                <button
                    className="hero-btn"
                    onClick={handleStartSharing}
                >
                    Start Sharing
                </button>

            </div>

            <div className="posts">

                <div className="post-card featured-card">

                    <span className="post-badge">
                        Blogify Space
                    </span>

                    <h3>
                        Create. Inspire. Connect.
                    </h3>

                    <p>
                        A millennial core space
                        for Gen Z creators ✨
                    </p>

                </div>

            </div>

        </div>
    )
}

export default Home