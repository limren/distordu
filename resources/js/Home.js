import React from "react";
import { Chat } from "./Components/Chat";
import { Friends } from "./Components/Friends";

export const Home = () => {
    return (
        <div className="main">
            <div>
                <Friends />
            </div>
            <div>
                <Chat />
            </div>
        </div>
    );
};
