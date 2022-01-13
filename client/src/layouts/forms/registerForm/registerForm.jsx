import React, {useState} from 'react';
import Input from "../../../components/input/input";
import Button from "../../../components/button/button";

import "./registerForm.scss";
import {apiPostRequest} from "../../../webWorkers/apiRequest";
import {emailRegex, userNameRegex} from "../../../workers/regex";

const RegisterForm = (props) => {

    const inputEmail = useState({val: "", isWrong: false});
    const inputUsername = useState({val: "", isWrong: false});
    const inputPassword = useState({val: "", isWrong: false});
    const inputPassword2 = useState({val: "", isWrong: false});

    const submit = () => {
        const data = {
            username: inputUsername[0].val,
            email: inputEmail[0].val,
            password: inputPassword[0].val
        }

        const pass2 = inputPassword2[0].val;

        if(!emailRegex.test(data.email)){
            inputEmail[1]({...inputEmail[0], isWrong: true});
            return;
        }

        if(!userNameRegex.test(data.username)){
            inputUsername[1]({...inputUsername[0], isWrong: true});
            return;
        }

        if(pass2 !== data.password || pass2 === ""){
            inputPassword2[1]({...inputPassword2[0], isWrong: true});
            inputPassword[1]({...inputPassword[0], isWrong: true});
            return;
        }

        return apiPostRequest("reg", data).then((r) => {
            if(r.status === 200){
                props.popupControll(false);
                props.successPopupController[1](true);
            }
            return r.json();
        }).then((data) => {
            console.log(data);
            data.map((dt) => {
                if(dt.param === "username"){
                    inputUsername[1]({...inputUsername[0], isWrong: true});
                }
                if(dt.param === "password"){
                    inputPassword[1]({...inputPassword[0], isWrong: true});
                }
                if(dt.param === "email"){
                    inputEmail[1]({...inputEmail[0], isWrong: true});
                }
            })
        });

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
