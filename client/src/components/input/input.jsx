import React from 'react';
import "./input.scss";

const Input = (props) => {
    return (
        <div>
            <input className="input" type="text" placeholder={props.placeholder} autoFocus={props.focus}/>
        </div>
    );
};

export default Input;
