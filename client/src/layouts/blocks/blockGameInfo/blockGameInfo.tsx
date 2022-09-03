import React from 'react';
import SmartIcon from "../../../components/smartIcon/smartIcon";

import "../../../styles/shared/block.scss";
import "./blockGameInfo.scss";
import Avatar from "../../../components/avatar/avatar";

const BlockGameInfo = () => {
    return (
        <div className="block">
            <span className="title">Игра</span>
            <div className="lobbyInfo">
                <Avatar/>
                <div className="info">
                    <span className="secondary">Соревновательная</span>
                    <div className="players">
                        <a href="#">Playername</a> <span className="secondary">vs</span> <a
                        href="#">Another</a>
                    </div>
                </div>
            </div>
            <div className="gameModesRow">
                <SmartIcon text="2/2" />
                <SmartIcon text="100" />
                <SmartIcon text="480" />
            </div>
        </div>
    );
};

export default BlockGameInfo;
