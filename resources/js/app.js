import { createRoot } from "react-dom/client";
require("./bootstrap");

const App = () => {
    const chan = Echo.channel("public.chatmessage.1");
    chan.subscribed(() => {
        console.log("Connected");
    }).listen(".chatmessage", (e) => {
        console.log(e);
    });
    return <h1>Hello world !</h1>;
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
