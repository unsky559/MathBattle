import React from 'react';
import './logo.scss';

function Logo(props) {
    return (
        <h1 className={["logo", props.alternate ? "alternate" : ""].join(" ")} href="/">
            MathBattle
        </h1>
    );
}

export default Logo;
