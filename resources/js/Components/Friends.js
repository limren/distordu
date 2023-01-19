import React, { useEffect } from "react";

export const Friends = () => {
    useEffect(() => {
        console.log("friends loaded");
    }, []);
    return (
        <div className="friends">
            <div className="sidebar"></div>
        </div>
    );
};
