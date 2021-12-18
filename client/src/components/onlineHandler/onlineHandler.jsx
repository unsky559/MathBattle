import React from 'react';
import "./onlineHandler.scss";

const OnlineHandler = (props) => {

    let classname;

    if(props.type === "online"){
        classname = "green";
    }else if(props.type === "offline"){
        classname = "gray";
    }else if(props.type === "inGame"){
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
