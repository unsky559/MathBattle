import React from 'react';

import "./avatar.scss";

const Avatar = (props) => {
    return (
        <div className={["avatar", props.big ? "big" : ""].join(" ")}>
            <img src="https://thispersondoesnotexist.com/image" alt=""/>
        </div>
    );
};

export default Avatar;
