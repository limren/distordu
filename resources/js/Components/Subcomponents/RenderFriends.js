import React from "react";

const RenderFriends = ({ friends }) => {
    return (
        <div className="friendlist">
            <h3>Friends</h3>
            {friends.map((friend) => {
                return (
                    <img
                        title={friend.username}
                        alt="Profile picture image of your friend !"
                        key={friend.id}
                        className="pfp"
                        src={
                            friend.img_path === null
                                ? "images/default.png"
                                : friend.img_path
                        }
                    />
                );
            })}
        </div>
    );
};

export default React.memo(RenderFriends);
