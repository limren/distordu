import React, { useCallback, useEffect, useRef } from "react";
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

    /*  The scrollToBottomRef function takes in parameter a ref, that is a reference to the div message DOM element, allowing us to scroll to the bottom of its children.
     * We're using a callback function because we want to make sure that the div message DOM element is rendered before.
     */
    const scrollToBottomRef = useCallback((currentNode) => {
        if (currentNode) {
            scrollToBottom(currentNode);
        }
    }, []);
    // We don't want to access to node.current since node is already the current node.
    const scrollToBottom = (node) => {
        node.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
        });
    };

    if (!messages) return null;
    chatChannel.listen(`.chatmessage.${friendId}`, (msg, senderId) => {
        if (senderId === friendId) {
            setMessages([
                ...messages,
                {
                    message: msg.message,
                    user_id_sender: friendId,
                },
            ]);
        }
    });

    return (
        <div className="messages" ref={scrollToBottomRef}>
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
