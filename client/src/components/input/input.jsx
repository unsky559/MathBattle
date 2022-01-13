import React from 'react';
import "./input.scss";

const Input = (props) => {
    const [textState, updateTextState] = props.textState;

    return (
        <div>
            <input className={["input", textState.isWrong ? "wrong" : null].join(" ")}
                   type={props.password ? "password" : "text"}
                   placeholder={props.placeholder}
                   autoFocus={props.focus}
                   onChange={ (e) => {
                       updateTextState({...textState, isWrong: false, val: e.target.value});
                   }}
            />
        </div>
    );
};

export default Input;
