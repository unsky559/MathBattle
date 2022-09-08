import React, {useMemo} from 'react';
import cl from "./userStatus.module.scss";
import Dropdown from "../dropdown/dropdown";
import ButtonList from "../buttonList/buttonList";
import {useHistory} from "react-router-dom";
import userState from "../../webWorkers/user/userState.ts";
import {useDispatch} from "react-redux";
import {userType} from "../../types/userType";

type propType = {
    userData: userType
}

const UserStatus = (props: propType) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const buttonList = useMemo(() => [
        {
            title: props.userData.username,
            onclick: () => {
                history.push(`/user/${props.userData.username}`);
            }
        },
        {
            title: "Logout",
            onclick: () => {
                userState.logout().then(() => {
                    dispatch({ type: "HEADER_UNLOGGED" });
                    history.push("/login");
                });
            }
        }], [props, history]);

    return (
        <div className={cl.dropdownHeaderContainer}>
            <Dropdown tabIndex = "0"
                      header = {
                        <div className={cl.userStatus}>
                            <div className={cl.userAvatarName}>
                                <div className={cl.avatar}>
                                    <img src="https://thispersondoesnotexist.com/image" alt=""/>
                                </div>

                                <span className={cl.userName}>
                                    {props.userData.username}
                                </span>

                            </div>
                        </div>
            }>
                <ButtonList
                    buttons={buttonList}/>
            </Dropdown>
        </div>
    );
};

export default UserStatus;
