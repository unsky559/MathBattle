import React from 'react';
import "./button.scss";

const Button = (props) => {
    return (
        <button className="button">
            { props.text }
        </button>
    );
};

export default Button;
