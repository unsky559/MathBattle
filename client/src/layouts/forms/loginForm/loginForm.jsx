import "./loginForm.scss";
import React, {useState} from 'react';
import Input from "../../../components/input/input";
import Button from "../../../components/button/button";
import {apiPostRequest} from "../../../webWorkers/apiRequest";

const LoginForm = () => {

    const inputLogin = useState('');
    const inputPassword = useState('');

    const submit = () => {
        const data = {
            "username" : inputLogin[0],
            "password" : inputPassword[0]
        };

        apiPostRequest("login", data).then((r) => {
            console.log(r);
        });
    }

    return (
        <div className="loginForm">
            <Input placeholder="name" textState={inputLogin} focus/>
            <Input placeholder="pass" textState={inputPassword} password />

            <Button text="Input" onClick={submit}/>
        </div>
    );
};

export default LoginForm;
