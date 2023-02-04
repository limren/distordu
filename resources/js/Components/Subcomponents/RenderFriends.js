import React from "react";
import { Link } from "react-router-dom";

const RenderFriends = ({ friends }) => {
    return (
        <div className="friendlist">
            <h3>Friends</h3>
            {friends.map((friend) => {
                return (
                    <Link key={friend.id} to={`/chat/${friend.id}`}>
                        <img
                            title={friend.username}
                            alt="Profile picture of your friend"
                            className="pfp"
                            src={
                                friend.img_path === null
                                    ? "images/default.png"
                                    : friend.img_path
                            }
                        />
                    </Link>
                );
            })}
        </div>
    );
};

export default React.memo(RenderFriends);
