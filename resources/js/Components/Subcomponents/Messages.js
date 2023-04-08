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
            .get(`http://distordu.test/api/message/${conversationId}/date`)
            .then((res) => res.data)
            .then((data) => {
                // Since the API returns an object, I need to convert it as an array
                setMessages(Object.entries(data));
            });
    }, []);

    /*  The scrollToBottomRef function takes in parameter a ref, that is a reference to the div message DOM element, allowing us to scroll to the bottom of it. */
    const scrollToBottomRef = (currentNode) => {
        if (currentNode) {
            scrollToBottom(currentNode);
        }
    };
    // We don't want to access to node.current since node is already the current node.
    const scrollToBottom = (node) => {
        node.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
        });
    };

    if (!messages) return null;
    chatChannel.listen(`.chatmessage.${friendId}`, (data) => {
        if (data.senderId == friendId) {
            const dateNow = new Date().toISOString().split("T")[0];
            let dayArleadyPushed = false;
            let myMessages = messages;
            myMessages.map((messagesByDate) => {
                if (messagesByDate[0] === dateNow && !dayArleadyPushed) {
                    messagesByDate[1].push(data.message);
                    dayArleadyPushed = true;
                }
            });
            if (!dayArleadyPushed) {
                myMessages.push([dateNow, data.message]);
            }
            setMessages([...myMessages]);
        }
    });

    return (
        <div className="messages-section" ref={scrollToBottomRef}>
            {messages.map((messagesByDate) => {
                return (
                    <div className="messages">
                        <h2>{messagesByDate[0]}</h2>
                        <div className="messages-by-date">
                            {messagesByDate[1].map((message) => {
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
                    </div>
                );
            })}
        </div>
    );
};

// We memoized messages component to avoid useless re-renders.
export const MessagesMemo = React.memo(Messages);
