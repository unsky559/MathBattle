import React from 'react';
import cl from "./input.module.scss";
import classNames from "classnames";

const Input = (props) => {
    const [textState, updateTextState] = props.textState;

    const clases = classNames(cl.input, {[cl.wrong]: textState.isWrong});

    return (
        <div>
            <input className={clases}
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
