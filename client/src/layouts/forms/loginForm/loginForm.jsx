import config from "../../../../config";
import React, {useState} from 'react';
import Input from "../../../components/input/input";

import Button from "../../../components/button/button";
import "./loginForm.scss";

const LoginForm = () => {

    const inputLogin = useState('');
    const inputPassword = useState('');

    const submit = () => {
        const data = {
            "username" : inputLogin[0],
            "password" : inputPassword[0]
        };

        fetch(config.apiPath('/login'), {
            method: 'POST',
            mode: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((resp) => {
            console.log(resp);
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
