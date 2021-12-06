import "./loginForm.scss";
import React, {useState} from 'react';
import Input from "../../../components/input/input";
import Button from "../../../components/button/button";
import {apiPostRequest} from "../../../webWorkers/apiRequest";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";

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
            if(r.status === 200){
                dispatch({ type: "HEADER_LOGGED" });
                history.push("/");
            }else{
                // TODO: catch errors
            }
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
