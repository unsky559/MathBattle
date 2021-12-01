import React from 'react';
import Avatar from "../avatar/avatar";
import SmartIcon from "../smartIcon/smartIcon";
import "./player.scss";

const Player = () => {
    return (
        <div className="player">
            <div className="lobbyInfo">
                <Avatar/>
                <div className="info">
                    <a className="playerName" href="#">Playername</a>
                    <SmartIcon text="225"/>
                </div>
                <span className="score">50</span>
            </div>
        </div>
    );
};

export default Player;
