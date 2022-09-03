import React from 'react';
import "./button.scss";

type propType = {
    onClick?: () => void,
    text: string
}

const Button = (props: propType) => {
    return (
        <button className="button" onClick={props.onClick}>
            {/*TODO: replace props.text to props.children*/}
            { props.text }
        </button>
    );
};

export default Button;
