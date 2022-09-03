import React from 'react';
import Avatar from "../avatar/avatar";
import SmartIcon from "../smartIcon/smartIcon";
import "./player.scss";
import {playerType} from "../../types/playerType";

type propType = {
    player: playerType,
}

const Player = (props: propType) => {

    const data = props.player;

    return (
        <div className="player">
            <div className="lobbyInfo">
                {
                    data.userdata.userpic && <Avatar/>
                }
                <div className="info">
                    <p className="playerName">{data.userdata.username}</p>
                    {
                        data.userdata.stats && <SmartIcon yellow icon="../static/images/icons/rating/bubble_chart_black_24dp 1.svg" text={data.userdata.stats.rating}/>
                    }
                </div>
                <span className="score">{data.score}</span>
            </div>
        </div>
    );
};

export default Player;
