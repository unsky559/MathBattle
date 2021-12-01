import React from 'react';
import SmartIcon from "../smartIcon/smartIcon";

import Avatar from "../avatar/avatar";
import "../../styles/shared/block.scss";
import "./blockScoreboard.scss";

const BlockScoreboard = () => {
    return (
        <div className="block">
            <span className="title">Игроки</span>
            <div className="scoreboard">
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
                <div className="player">
                    <div className="lobbyInfo">
                        <div className="avatar">
                            <img src="https://thispersondoesnotexist.com/image" alt=""/>
                        </div>
                        <div className="info">
                            <a className="playerName" href="#">Playername</a>
                            <SmartIcon text="225"/>
                        </div>
                        <span className="score">50</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlockScoreboard;
