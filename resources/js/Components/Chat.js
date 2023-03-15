import instance from "../Utils/configAxios";
import Echo from "laravel-echo";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Messages from "./Subcomponents/Messages";

export const Chat = ({ user }) => {
    let { friendId } = useParams();
    const [conversationId, setConversationId] = useState(null);
    //const [messages, setMessages] = useState([]);
    const [enteredMessage, setEnteredMessage] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
    };
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
    useEffect(() => {
        getConversationId(user.id, friendId);
    }, []);
    if (!conversationId) return null;
    return (
        <div className="chat">
            <div className="chat-main">
                <Messages conversationId={conversationId} userId={user.id} />
            </div>
            <div className="chat-footer">
                <form onClick={(e) => handleSubmit(e)}>
                    <input
                        onChange={(e) => setEnteredMessage(e.target.value)}
                        placeholder="Enter a message here"
                    />
                    {enteredMessage === "" ? <></> : <input type="submit" />}
                </form>
            </div>
        </div>
    );
};
