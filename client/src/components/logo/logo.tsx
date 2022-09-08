import React from 'react';
import cl from './logo.module.scss';
import classNames from "classnames";

type propType = {
    alternate: boolean
}

function Logo(props: propType) {
    const classes = classNames(cl.logo, {[cl.alternate]: props.alternate})
    return (
        <h1 className={classes}>
            MathBattle
        </h1>
    );
}

export default Logo;
