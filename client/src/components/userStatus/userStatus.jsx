import React from 'react';
import "./userStatus.scss";

const UserStatus = () => {
    return (
        <div className="userStatus">
            <div className="userAvatarName" tabIndex="0">
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
