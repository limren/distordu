import React from "react";
import { Chat } from "./Components/Chat";
import { Friends } from "./Components/Friends";

export const Home = ({ user }) => {
    return (
        <div className="main">
            <div>
                <Friends user={user} />
            </div>
            <div>
                <Chat />
            </div>
        </div>
    );
};
