import React from 'react';
import cl from "./smartIcon.module.scss";
import classNames from "classnames";

type propType = {
    gray?: boolean,
    yellow?: boolean,
    texty?: boolean,
    icon?: string,
    text?: string | number
}

const SmartIcon = (props: propType) => {
    return (
        <div className={cl.smartIcon}>
            <div className={cl.iconicInfo}>
                <div className={classNames(cl.iconicIcon, {[cl.gray]: props.gray, [cl.yellow]: props.yellow})}>
                    {   props.texty &&
                        <span>{props.icon}</span> }
                    {   !props.texty && props.icon &&
                        <img src={props.icon} alt="icon" /> }
                </div>
                {   props.text &&
                    <div className={cl.iconicData}>
                        { props.text }
                    </div>
                }
            </div>
        </div>
    );
};

export default SmartIcon;
