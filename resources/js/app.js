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
import { useState } from "react";
import { Home } from "./Home";
import { ProtectedRoute } from "./Utils/ProtectedRoute";
require("./bootstrap");

const App = () => {
    const [user, setUser] = useState({});
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [isAuth, setIsAuth] = useState(false);
    const router = createHashRouter([
        {
            path: "/",
            element: (
                <ProtectedRoute>
                    <Home />
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
