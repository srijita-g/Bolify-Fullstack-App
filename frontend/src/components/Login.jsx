import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleLogin = async (e) => {

        e.preventDefault()

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/login",
                {
                    username,
                    password
                }
            )

            localStorage.setItem(
                "token",
                response.data.access_token
            )

            navigate("/mystories")

        } catch (error) {

            alert(
                "User not found. Please register first."
            )

            navigate("/register")
        }
    }

    return (

        <div className="auth-page">

            <div className="auth-card">

                <h1>
                    Login
                </h1>

                <form onSubmit={handleLogin}>

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

                <p className="bottom-text">

                    Don’t have an account?

                    <Link to="/register">

                        <span>
                            Register
                        </span>

                    </Link>

                </p>

            </div>

        </div>
    )
}

export default Login