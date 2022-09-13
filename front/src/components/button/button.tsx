import React from 'react';
import cl from "./button.module.scss";

type propType = {
    onClick?: () => void,
    text: string
}

const Button = (props: propType) => {
    return (
        <button className={cl.button} onClick={props.onClick}>
            {/*TODO: replace props.text to props.children*/}
            { props.text }
        </button>
    );
};

export default Button;
