import React, { useEffect, useState } from "react";
import instance from "../../Utils/configAxios";

const Messages = ({ conversationId, userId, setMessages, messages }) => {
    useEffect(() => {
        instance
            .get(`http://distordu.test/api/message/${conversationId}/${userId}`)
            .then((res) => res.data)
            .then((data) => {
                console.log(data);
                setMessages(data);
            });
    }, []);
    if (!messages) return null;
    console.log(messages);
    return (
        <div className="messages">
            {messages.map((message) => {
                return (
                    <p
                        className={
                            message.user_id_sender == userId
                                ? "message-sender"
                                : "message-receiver"
                        }
                    >
                        {message.message}
                    </p>
                );
            })}
        </div>
    );
};

export default React.memo(Messages);
