import React from 'react';
import "./gameKey.scss";

const GameKey = (props) => {

    const keyClasses = ["key", props.isOk ? "ok" : null, props.isZero ? "zero" : null];

    return (
        <div className={keyClasses.join(" ")}>
            <button>{ props.text }</button>
        </div>
    );
};

export default GameKey;
