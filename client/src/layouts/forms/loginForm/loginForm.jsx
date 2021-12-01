import React from 'react';
import Input from "../../../components/input/input";
import Button from "../../../components/button/button";

import "./loginForm.scss";

const LoginForm = () => {
    return (
        <div className="loginForm">
            <Input placeholder="name" focus/>
            <Input placeholder="pass" />

            <Button text="Input"/>
        </div>
    );
};

export default LoginForm;
