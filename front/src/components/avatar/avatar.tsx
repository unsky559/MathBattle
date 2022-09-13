import React from 'react';

import cl from "./avatar.module.scss";
import classNames from "classnames";

type propType = {
    big?: boolean
}

const Avatar = (props: propType) => {

    const classes = classNames({
        [cl.avatar] : true,
        [cl.big]: props.big,
    });

    return (
        <div className={classes}>
            <img src="https://thispersondoesnotexist.com/image" alt=""/>
        </div>
    );
};

export default Avatar;
