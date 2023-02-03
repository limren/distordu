import axios from "axios";
import React, { useEffect } from "react";

export const Friends = ({ user }) => {
    useEffect(() => {
        axios.get(`http://distordu.test/api/friends/get/${user.id}`);
    }, []);
    return (
        <div className="friends">
            <div className="sidebar"></div>
        </div>
    );
};
