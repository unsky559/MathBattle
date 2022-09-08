import cl from "./loginForm.module.scss";
import React, {useState} from 'react';
import Input from "../../../components/input/input";
import Button from "../../../components/button/button";
import {apiPostRequest} from "../../../webWorkers/apiRequest.ts";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import userState from "../../../webWorkers/user/userState.ts";
import {userNameRegex} from "../../../workers/regex.ts";

const LoginForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const inputLogin = useState({val: "", isWrong: false});
    const inputPassword = useState({val: "", isWrong: false});

    const submit = () => {
        const data = {
            "username" : inputLogin[0].val,
            "password" : inputPassword[0].val
        };

        if(!userNameRegex.test(data.username)){
            inputLogin[1]({...inputLogin[0], isWrong: true});
            return;
        }

        if(data.password === ""){
            inputPassword[1]({...inputPassword[0], isWrong: true});
            return;
        }

        apiPostRequest("login", data).then((r: Response) => {
            switch (r.status){
                case 200:
                    history.push("/");
                    userState.login().then(() => {
                        dispatch({ type: "HEADER_LOGGED" });
                    });
                    return;
                case 409:
                    history.push("/");
                    throw new Error("You already logged in");
                default:
                    inputLogin[1]({...inputLogin[0], isWrong: true});
                    inputPassword[1]({...inputPassword[0], isWrong: true});
                    return;
            }
        });
    }

    return (
        <div className={cl.loginForm}>
            <Input placeholder="name" textState={inputLogin} focus/>
            <Input placeholder="pass" textState={inputPassword} password />

            <Button text="Input" onClick={submit}/>
        </div>
    );
};

export default LoginForm;
