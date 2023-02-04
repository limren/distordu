import React from "react";
import { Chat } from "./Components/Chat";
import { Friends } from "./Components/Friends";

export const Home = ({ user }) => {
    return (
        <div className="home-main">
            <Friends user={user} />
            <Chat />
        </div>
    );
};
