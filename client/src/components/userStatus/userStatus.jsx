import React from 'react';
import "./userStatus.scss";

const UserStatus = (props) => {
    return (
        <div className="userStatus">
            <div className="userAvatarName" tabIndex="0">
                <div className="avatar">
                    <img src="https://thispersondoesnotexist.com/image" alt=""/>
                </div>
                <span className="userName">
                    {props.userData[0].username}
                </span>
            </div>
        </div>
    );
};

export default UserStatus;
