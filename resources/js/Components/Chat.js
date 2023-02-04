import Echo from "laravel-echo";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Messages from "./Subcomponents/Messages";

export const Chat = ({ user }) => {
    let { friendId } = useParams();
    const [enteredMessage, setEnteredMessage] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const channel = window.Echo.channel("chat").listen(
        ".chatmessage",
        (msg) => {}
    );
    return (
        <div className="chat">
            <div className="chat-main">
                <Messages />
            </div>
            <div className="chat-footer">
                <form onClick={(e) => handleSubmit(e)}>
                    <input
                        onChange={(e) => setEnteredMessage(e.target.value)}
                        placeholder="Enter a message here"
                    />
                </form>
            </div>
        </div>
    );
};
