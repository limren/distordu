import instance from "../Utils/configAxios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Messages from "./Subcomponents/Messages";

export const Chat = ({ user }) => {
    let { friendId } = useParams();
    const [conversationId, setConversationId] = useState(null);
    const [messages, setMessages] = useState(null);
    const [enteredMessage, setEnteredMessage] = useState("");
    const getConversationId = (userId, friendId) => {
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
                        instance
                            .post("http://distordu.test/api/chatmessage", {
                                message: enteredMessage,
                                conversation_id: conversationId,
                                senderId: user.id,
                            })
                            .catch((e) => console.log(e));
                    }
                });
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getConversationId(user.id, friendId);
    }, []);
    useEffect(() => {
        return () => {
            window.Echo.leave(`chat.${conversationId}`);
        };
    }, []);

    if (!conversationId) return null;
    const chatChannel = window.Echo.private(`chat.${conversationId}`);

    return (
        <div className="chat">
            <div className="chat-main">
                <Messages
                    conversationId={conversationId}
                    userId={user.id}
                    setMessages={setMessages}
                    messages={messages}
                    chatChannel={chatChannel}
                    friendId={friendId}
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
