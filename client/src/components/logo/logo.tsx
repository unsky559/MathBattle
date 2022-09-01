import React from 'react';
import './logo.scss';

type propType = {
    alternate: boolean
}

function Logo(props: propType) {
    return (
        <h1 className={["logo", props.alternate ? "alternate" : ""].join(" ")}>
            MathBattle
        </h1>
    );
}

export default Logo;
