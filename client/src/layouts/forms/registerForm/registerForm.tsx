import React, {Dispatch, SetStateAction, useState} from 'react';
import Input from "../../../components/input/input";
import Button from "../../../components/button/button";

import cl from "./registerForm.module.scss";
import {apiPostRequest} from "../../../webWorkers/apiRequest.ts";
import {emailRegex, userNameRegex} from "../../../workers/regex.ts";

type propType = {
    popupControll: Dispatch<SetStateAction<boolean>>,
    successPopupController: [boolean, Dispatch<SetStateAction<boolean>>]
}

const RegisterForm = (props: propType) => {

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

        return apiPostRequest("reg", data).then((r: Response) => {
            if(r.status === 200){
                props.popupControll(false);
                props.successPopupController[1](true);
            }
            return r.json();
        }).then((data: Record<string, any>) => {
            console.log(data);
            data.map((dt: any) => {
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
        <div className={cl.loginForm}>
            <Input placeholder="email" textState={inputEmail} focus />
            <Input placeholder="username" textState={inputUsername} />
            <Input placeholder="pass" textState={inputPassword} password />
            <Input placeholder="pass2" textState={inputPassword2} password />

            <Button text="Reg" onClick={submit}/>
        </div>
    );
};

export default RegisterForm;
