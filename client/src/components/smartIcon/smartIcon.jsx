import React from 'react';
import "./smartIcon.scss";

const SmartIcon = (props) => {
    return (
        <div className="smartIcon">
            <div className="iconicInfo">
                <div className={["iconicIcon", props.gray ? "gray" : ""].join(" ")}>
                    {   props.texty ? <span>{props.icon}</span> :
                        (props.icon ? <img src={props.icon} /> : "") }
                </div>
                { props.text ? <div className="iconicData">
                        { props.text }
                    </div> : ""}
            </div>
        </div>
    );
};

export default SmartIcon;
