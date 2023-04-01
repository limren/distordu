import instance from "../Utils/configAxios";
import Echo from "laravel-echo";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Messages from "./Subcomponents/Messages";

export const Chat = ({ user }) => {
    let { friendId } = useParams();
    const [conversationId, setConversationId] = useState(null);
    const [messages, setMessages] = useState(null);
    const [enteredMessage, setEnteredMessage] = useState("");

    const getConversationId = (userId, friendId) => {
        console.log("being called");
        instance
            .post("http://distordu.test/api/conversation/getId", {
                user1_id: userId,
                user2_id: friendId,
            })
            .then((res) => res.data)
            .then((data) => {
                setConversationId(data.conversation_id);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const postMessage = (e) => {
        e.preventDefault();
        try {
            instance
                .post("http://distordu.test/api/message/post", {
                    conversation_id: conversationId,
                    user_id: user.id,
                    message: enteredMessage,
                })
                .then((res) => res.data)
                .then((data) => {
                    if (data.status) {
                        setMessages([...messages, data.message]);
                    }
                });
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getConversationId(user.id, friendId);
        const chatChannel = window.Echo.private(
            `private.chat.${conversationId}`
        );
        chatChannel.listen(".chatmessage", (msg) => {
            console.log(msg);
        });
    }, []);
    if (!conversationId) return null;
    return (
        <div className="chat">
            <div className="chat-main">
                <Messages
                    conversationId={conversationId}
                    userId={user.id}
                    setMessages={setMessages}
                    messages={messages}
                />
            </div>
            <div className="chat-footer">
                <form onSubmit={(e) => postMessage(e)}>
                    <input
                        onChange={(e) => setEnteredMessage(e.target.value)}
                        placeholder="Enter a message here"
                        id={enteredMessage === "" ? "full-width" : ""}
                    />
                    {enteredMessage === "" ? <></> : <input type="submit" />}
                </form>
            </div>
        </div>
    );
};
