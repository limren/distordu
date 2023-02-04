import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    createHashRouter,
    createRoutesFromElements,
    Link,
    Route,
    RouterProvider,
    Routes,
} from "react-router-dom";
import { Auth } from "./Pages/Auth/Auth";
import { Login } from "./Pages/Auth/Login";
import { Register } from "./Pages/Auth/Register";
import "../css/app.css";
import { useEffect, useState } from "react";
import { Home } from "./Home";
import { ProtectedRoute } from "./Utils/ProtectedRoute";
import { Chat } from "./Components/Chat";
import { Settings } from "./Components/Settings";
require("./bootstrap");

const App = () => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [isAuth, setIsAuth] = useState(
        localStorage.getItem("isAuthenticated") || false
    );

    const router = createHashRouter([
        {
            path: "/",
            element: (
                <ProtectedRoute isAuth={isAuth}>
                    <Home user={user} child={<Chat />} />
                </ProtectedRoute>
            ),
        },
        {
            path: "/settings",
            element: (
                <ProtectedRoute isAuth={isAuth}>
                    <Home user={user} child={<Settings user={user} />} />
                </ProtectedRoute>
            ),
        },
        {
            path: "/chat/:friendId",
            element: (
                <ProtectedRoute isAuth={isAuth}>
                    <Home user={user} child={<Chat user={user} />} />
                </ProtectedRoute>
            ),
        },
        {
            path: "/login",
            element: (
                <Auth
                    child={
                        <Login
                            setPassword={setPassword}
                            setEmail={setEmail}
                            setUser={setUser}
                            setIsAuth={setIsAuth}
                            password={password}
                            email={email}
                            setToken={setToken}
                        />
                    }
                />
            ),
        },
        {
            path: "/register",
            element: (
                <Auth
                    child={
                        <Register
                            setPassword={setPassword}
                            setEmail={setEmail}
                            setUsername={setUsername}
                            password={password}
                            email={email}
                            username={username}
                        />
                    }
                />
            ),
        },
        // {
        //     path: "/logout",
        //     element: <Logout />,
        // },
    ]);
    // createRoutesFromElements(
    //     <Route
    //         path="/"
    //         // element={<ProtectedRoute children={<Home />} isAuth={isAuth} />}
    //         element={<Home />}
    //     >
    //         <Route index path="login" element={<Login />} />
    //     </Route>
    // )
    // const chan = Echo.channel("public.chatmessage.1");
    // chan.subscribed(() => {
    //     console.log("Connected");
    // }).listen(".chatmessage", (e) => {
    //     console.log(e);
    // });

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
