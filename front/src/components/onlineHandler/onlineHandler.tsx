import React from 'react';
import cl from "./onlineHandler.module.scss";
import {statusType} from "../../types/statusType";
import classNames from "classnames";

type propType = {
    type: statusType
}

const OnlineHandler = (props: propType) => {

    let pointColor = cl.gray;
    switch (props.type){
        case statusType.online:
            pointColor = cl.green;
            break;
        case statusType.offline:
            pointColor = cl.gray;
            break;
        case statusType.inGame:
            pointColor = cl.orange;
            break;
    }

    const classes = classNames(cl.onlineHandler, pointColor);

    return (
        <div className={classes}>
            <div className={cl.point}/>
            <span>{props.type}</span>
        </div>
    )
};

export default OnlineHandler;
