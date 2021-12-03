import React, {useState} from 'react';
import Input from "../../../components/input/input";
import Button from "../../../components/button/button";

import "./registerForm.scss";
import config from "../../../../config";
import {body} from "express-validator";

const RegisterForm = () => {

    const inputEmail = useState('');
    const inputUsername = useState('');
    const inputPassword = useState('');
    const inputPassword2 = useState('');

    const submit = () => {
        const data = {
            "username": inputUsername[0],
            "email": inputEmail[0],
            "password": inputPassword[0]
        }

        fetch(config.apiPath("/reg"), {
            method: 'POST',
            mode: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((resp) => {
            return resp.json();
        }).then((data) => {
            console.log(data);
        })

    }

    return (
        <div className="loginForm">
            <Input placeholder="email" textState={inputEmail} focus />
            <Input placeholder="username" textState={inputUsername} />
            <Input placeholder="pass" textState={inputPassword} password />
            <Input placeholder="pass2" textState={inputPassword2} password />

            <Button text="Reg" onClick={submit}/>
        </div>
    );
};

export default RegisterForm;
