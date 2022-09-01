import React from 'react';

import "./avatar.scss";

type propType = {
    big?: boolean
}

const Avatar = (props: propType) => {
    // TODO: refactor classNames
    return (
        <div className={["avatar", props.big ? "big" : ""].join(" ")}>
            <img src="https://thispersondoesnotexist.com/image" alt=""/>
        </div>
    );
};

export default Avatar;
