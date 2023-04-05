import React, { useEffect } from "react";
import instance from "../../Utils/configAxios";

const Messages = ({
    conversationId,
    userId,
    setMessages,
    messages,
    chatChannel,
    friendId,
}) => {
    useEffect(() => {
        instance
            .get(`http://distordu.test/api/message/${conversationId}/`)
            .then((res) => res.data)
            .then((data) => {
                setMessages(data);
            });
    }, []);

    if (!messages) return null;
    chatChannel.listen(`.chatmessage.${friendId}`, (msg, senderId) => {
        setMessages([
            ...messages,
            {
                message: msg.message,
                user_id_sender: friendId,
            },
        ]);
    });
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
                        key={message.id}
                    >
                        {message.message}
                    </p>
                );
            })}
        </div>
    );
};

export default React.memo(Messages);
