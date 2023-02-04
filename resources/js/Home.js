import React from "react";
import { Chat } from "./Components/Chat";
import { Friends } from "./Components/Friends";

export const Home = ({ user, child }) => {
    return (
        <div className="home-main">
            <Friends user={user} />
            <div className="main-side-page">{child}</div>
        </div>
    );
};
