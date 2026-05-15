import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api"

function CreatePost() {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const navigate = useNavigate()

    async function handleSubmit(e) {

        e.preventDefault()

        try {

            const token = localStorage.getItem("token")

            await API.post(
                "/posts",
                {
                    title,
                    content
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            alert("Blog Created Successfully ✨")

            navigate("/mystories")

        } catch (error) {

            console.log(error)

            alert("Failed To Create Blog")
        }
    }

    return (

        <div className="create-page">

            <div className="form-container create-form">

                <h2>
                    Create New Story ✨
                </h2>

                <p className="create-subtext">
                    Share your thoughts with the world
                </p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Enter blog title..."
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                    />

                    <textarea
                        placeholder="Write your story here..."
                        value={content}
                        onChange={(e) =>
                            setContent(e.target.value)
                        }
                    />

                    <button type="submit">
                        Publish Story
                    </button>

                </form>

            </div>

        </div>
    )
}

export default CreatePost