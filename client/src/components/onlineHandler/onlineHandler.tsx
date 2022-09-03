import React from 'react';
import "./onlineHandler.scss";
import {statusType} from "../../types/statusType";

type propType = {
    type: statusType
}

const OnlineHandler = (props: propType) => {

    let classname;

    if(props.type === statusType.online){
        classname = "green";
    }else if(props.type === statusType.offline){
        classname = "gray";
    }else if(props.type === statusType.inGame){
        classname = "orange";
    }

    return (
        <div className={["onlineHandler", classname].join(" ")}>
            <div className="point"/>
            <span>{props.type}</span>
        </div>
    )
};

export default OnlineHandler;
