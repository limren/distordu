import React, { useEffect, useState } from "react";
import instance from "../Utils/configAxios";
import RenderFriends from "./Subcomponents/RenderFriends";

export const Friends = ({ user }) => {
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
                <img src="images/settings.svg" className="settings" />
            </div>
        </div>
    );
};
