import { createRoot } from "react-dom/client";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { Home } from "./Pages/Home";
import "../css/app.css";
require("./bootstrap");

const App = () => {
    const chan = Echo.channel("public.chatmessage.1");
    chan.subscribed(() => {
        console.log("Connected");
    }).listen(".chatmessage", (e) => {
        console.log(e);
    });

    return (
        <div>
            <Link to="/home">Go to home !</Link>
        </div>
    );
};
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/home",
        element: <Home />,
    },
]);

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
