import "./loginForm.scss";
import React, {useState} from 'react';
import Input from "../../../components/input/input";
import Button from "../../../components/button/button";
import {apiPostRequest} from "../../../webWorkers/apiRequest";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import userState from "../../../webWorkers/user/userState";

const LoginForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const inputLogin = useState('');
    const inputPassword = useState('');

    const submit = () => {
        const data = {
            "username" : inputLogin[0],
            "password" : inputPassword[0]
        };

        apiPostRequest("login", data).then((r) => {
            switch (r.status){
                case 200:
                    history.push("/");
                    return r.json();
                case 409:
                    history.push("/");
                    throw new Error("You already logged in");
                    return;
                default:
                    throw new Error("Nothing good");
                    return;
            }
        }).then((data) => {
            console.log(data);
            userState.login().then(r => {
                dispatch({ type: "HEADER_LOGGED" });
            });
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
