import React from 'react';
import "./input.scss";

const Input = (props) => {
    return (
        <div>
            <input className="input" type="text" placeholder={props.placeholder}/>
        </div>
    );
};

export default Input;
