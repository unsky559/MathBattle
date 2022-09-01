import React from 'react';
import "./gameKey.scss";

type propType = {
    isOk?:boolean,
    isZero?:boolean,
    onClick: () => void,
    text: string
}

const GameKey = (props: propType) => {

    const keyClasses = ["key", props.isOk ? "ok" : null, props.isZero ? "zero" : null];

    return (
        <div className={keyClasses.join(" ")}>
            <button onClick={props.onClick}>{ props.text }</button>
        </div>
    );
};

export default GameKey;
