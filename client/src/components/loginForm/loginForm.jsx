import React from 'react';
import Button from "../button/button";
import Input from "../input/input";

import "./loginForm.scss";

const LoginForm = () => {
    return (
        <div className="loginForm">
            <Input placeholder="name" />
            <Input placeholder="pass" />

            <Button text="Input"/>
        </div>
    );
};

export default LoginForm;
