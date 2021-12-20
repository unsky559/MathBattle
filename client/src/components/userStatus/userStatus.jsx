import React from 'react';
import "./userStatus.scss";
import Dropdown from "../dropdown/dropdown";
import ButtonList from "../buttonList/buttonList";
import {useHistory} from "react-router-dom";
import userState from "../../webWorkers/user/userState";
import {useDispatch} from "react-redux";

const UserStatus = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const buttons = [
        {title: props.userData[0].username,
        onclick: () => {
                history.push(`/user/${props.userData[0].username}`);
            }
        },
        {title: "Logout",
            onclick: () => {
                userState.logout().then(() => {
                    dispatch({ type: "HEADER_UNLOGGED" });
                    history.push("/login");
                });
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
