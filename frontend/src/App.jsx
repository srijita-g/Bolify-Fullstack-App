import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import CreatePost from "./components/CreatePost"
import MyStories from "./components/MyStories"
import PublicBlogs from "./components/PublicBlogs"

import "./style.css"

function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/create"
                    element={<CreatePost />}
                />

                <Route
                    path="/mystories"
                    element={<MyStories />}
                />

                <Route
                    path="/public"
                    element={<PublicBlogs />}
                />

            </Routes>

        </BrowserRouter>
    )
}

export default App