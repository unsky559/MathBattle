import React from 'react';

import "./avatar.scss";

type propType = {
    big?: boolean
}

const Avatar = (props: propType) => {
    return (
        <div className={["avatar", props.big ? "big" : ""].join(" ")}> // TODO: refactor classNames
            <img src="https://thispersondoesnotexist.com/image" alt=""/>
        </div>
    );
};

export default Avatar;
