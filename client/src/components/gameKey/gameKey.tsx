import React from 'react';
import cl from "./gameKey.module.scss";
import classNames from "classnames";

type propType = {
    isOk?:boolean,
    isZero?:boolean,
    classWidth?: string,
    onClick: () => void,
    text: string
}

// TODO: add enum with sizes like 1/4 1/3 1/2 Maybe 2/1(for vertical shrink)
// TODO: replace all this props with size enum
// TODO: remove width class (and prop) from gameKeyboard.tsx

const GameKey = (props: propType) => {

    const keyClasses = classNames({
            [props.classWidth || cl.keyDefaultWidth]: true,
            [cl.key]: true,
            [cl.ok]: props.isOk,
            [cl.zero]: props.isZero,
        }
    )

    return (
        <div className={keyClasses}>
            <button onClick={props.onClick}>{ props.text }</button>
        </div>
    );
};

export default GameKey;
