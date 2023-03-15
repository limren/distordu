import React, { useEffect, useState } from "react";
import instance from "../../Utils/configAxios";

const Messages = ({ conversationId, userId }) => {
    const [messages, setMessages] = useState(null);
    useEffect(() => {
        instance
            .get(
                `http://distordu.test/api/message/ ${conversationId}/${userId}`
            )
            .then((res) => res.data)
            .then((data) => setMessages(data));
    });
    if (!messages) return null;
    return (
        <div className="messages">
            {messages.map((message) => {
                console.log(message.message);
            })}
        </div>
    );
};

export default React.memo(Messages);
