import React from 'react';
import './logo.scss';

function Logo(props) {
    return (
        <a className={["logo", props.alternate ? "alternate" : ""].join(" ")} href="/">
            MathBattle
        </a>
    );
}

export default Logo;
