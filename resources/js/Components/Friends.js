import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instance from "../Utils/configAxios";
import RenderFriends from "./Subcomponents/RenderFriends";

export const Friends = ({ user }) => {
    console.log(user);
    const [friends, setFriends] = useState([]);
    useEffect(() => {
        instance
            .get(`http://distordu.test/api/friends/get/${user.id}`)
            .then((res) => res.data)
            .then((data) => {
                setFriends(data);
            });
    }, []);

    return (
        <div className="friends">
            <div className="sidebar">
                {friends.length == 0 ? "" : <RenderFriends friends={friends} />}
                <Link to="/settings">
                    <img src="images/settings.svg" className="settings" />
                </Link>
            </div>
        </div>
    );
};
