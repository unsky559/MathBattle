import React, {createRef, useRef, useState} from 'react';
import "./userStatus.scss";
import Dropdown from "../dropdown/dropdown";
import ButtonList from "../buttonList/buttonList";
import {useHistory} from "react-router-dom";

const UserStatus = (props) => {
    const history = useHistory();

    const buttons = [
        {title: props.userData[0].username,
        onclick: () => {
                history.push(`/user/${props.userData[0].username}`);
            }
        },
        {title: "Настройки",
            onclick: () => {
                history.push("/settings");
            }
        },
        {title: "Logout",
            onclick: () => {
                console.log("do logout");
                history.push("/login");
            }
        }];
    return (
        <div className="dropdownHeaderContainer">
            <Dropdown tabIndex = "0"
                      header = {
                        <div className="userStatus">
                            <div className="userAvatarName">
                                <div className="avatar">
                                    <img src="https://thispersondoesnotexist.com/image" alt=""/>
                                </div>

                                <span className="userName">
                                    {props.userData[0].username}
                                </span>

                            </div>
                        </div>
            }>
                <ButtonList
                    buttons={buttons}/>
            </Dropdown>
        </div>
    );
};

export default UserStatus;
