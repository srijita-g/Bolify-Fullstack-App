import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api"

function Register() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    async function handleRegister(e) {

        e.preventDefault()

        try {

            await API.post(
                "/register",
                {
                    username,
                    password
                }
            )

            const res = await API.post(
                "/login",
                {
                    username,
                    password
                }
            )

            localStorage.setItem(
                "token",
                res.data.access_token
            )

            alert("Registration Successful")

            navigate("/mystories")

            window.location.reload()

        } catch (error) {

            alert("Registration Failed")
        }
    }

    return (

        <div className="form-container">

            <h2>Register</h2>

            <form onSubmit={handleRegister}>

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

                <button>
                    Register
                </button>

            </form>

        </div>

    )
}

export default Register