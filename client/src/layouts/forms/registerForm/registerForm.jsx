import React from 'react';
import Input from "../../../components/input/input";
import Button from "../../../components/button/button";

import "./registerForm.scss";

const RegisterForm = () => {
    return (
        <div className="loginForm">
            <Input placeholder="email" focus />
            <Input placeholder="pass" />
            <Input placeholder="pass2" />

            <Button text="Reg"/>
        </div>
    );
};

export default RegisterForm;
