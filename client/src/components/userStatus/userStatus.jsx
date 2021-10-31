import React from 'react';
import "./userStatus.scss";

const UserStatus = () => {
    return (
        <div className="userStatus">
            <div className="userAvatarName">
                <div className="avatar">
                    <img src="https://thispersondoesnotexist.com/image" alt=""/>
                </div>
                <span className="userName">
                    НикНейм
                </span>
            </div>
            
        </div>
    );
};

export default UserStatus;
