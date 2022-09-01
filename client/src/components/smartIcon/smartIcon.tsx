import React from 'react';
import "./smartIcon.scss";

type propType = {
    gray?: boolean,
    yellow?: boolean,
    texty?: boolean,
    icon?: string,
    text?: string | number
}

const SmartIcon = (props: propType) => {
    return (
        <div className="smartIcon">
            <div className="iconicInfo">
                <div className={["iconicIcon", props.gray ? "gray" : "", props.yellow ? "yellow" : ""].join(" ")}>
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
