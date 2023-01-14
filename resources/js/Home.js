import React from "react";
import { Chat } from "./Components/Chat";
import { Guilds } from "./Components/Guilds";

export const Home = () => {
    return (
        <div className="main">
            <div>
                <Guilds />
            </div>
            <div>
                <Chat />
            </div>
        </div>
    );
};
