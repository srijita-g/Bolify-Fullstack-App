import { Link } from "react-router-dom"

function Navbar() {

    const token = localStorage.getItem("token")

    function handleLogout() {

        localStorage.removeItem("token")

        window.location.href = "/"
    }

    return (

        <div className="navbar">

            <div className="container nav-content">

                <div className="logo">
                    Blogify
                </div>

                <div className="nav-links">

                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/public">
                        Public Blogs
                    </Link>

                    {
                        token && (

                            <Link to="/create">
                                Create
                            </Link>
                        )
                    }

                    {
                        !token ? (
                            <>
                                <Link to="/login">
                                    Login
                                </Link>

                                <Link to="/register">
                                    Register
                                </Link>
                            </>
                        ) : (
                            <a
                                href="#"
                                onClick={handleLogout}
                            >
                                Logout
                            </a>
                        )
                    }

                </div>

            </div>

        </div>
    )
}

export default Navbar