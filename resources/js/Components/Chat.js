import instance from "../Utils/configAxios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MessagesMemo } from "./Subcomponents/Messages";

export const Chat = ({ user }) => {
    let { friendId } = useParams();
    const [messages, setMessages] = useState(null);
    const [conversationId, setConversationId] = useState(null);
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
                        // We're checking if the date of the message has been already pushed. If not, we push the date & the message. If it has, we don't push the date but we push the message at its date.
                        const dateNow = new Date().toISOString().split("T")[0];
                        let dayArleadyPushed = false;
                        let myMessages = messages;
                        myMessages.map((messagesByDate) => {
                            if (
                                messagesByDate[0] === dateNow &&
                                !dayArleadyPushed
                            ) {
                                messagesByDate[1].push(data.message);
                                dayArleadyPushed = true;
                            }
                        });
                        if (!dayArleadyPushed) {
                            myMessages.push([dateNow, data.message]);
                        }
                        // ...myMessages is important here, since I initiated it at messages, ...myMessages will not reference to the messages array and thus, will rerender MessagesMemo component.
                        setMessages([...myMessages]);
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
        return () => {
            window.Echo.leave(`chat.${conversationId}`);
        };
    }, []);

    if (!conversationId) return null;
    const chatChannel = window.Echo.private(`chat.${conversationId}`);

    return (
        <div className="chat">
            <div className="chat-main">
                <MessagesMemo
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
