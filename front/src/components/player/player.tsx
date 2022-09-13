import React from 'react';
import Avatar from "../avatar/avatar";
import SmartIcon from "../smartIcon/smartIcon";
import cl from "./player.module.scss";
import {playerType} from "../../types/playerType";

type propType = {
    player: playerType,
}

const Player = (props: propType) => {

    const data = props.player;

    return (
        <div className={cl.player}>
            <div className={cl.lobbyInfo}>
                {
                    data.userdata.userpic && <Avatar/>
                }
                <div className={cl.info}>
                    <p className={cl.playerName}>{data.userdata.username}</p>
                    {
                        data.userdata.stats && <SmartIcon yellow icon="../static/images/icons/rating/bubble_chart_black_24dp 1.svg" text={data.userdata.stats.rating}/>
                    }
                </div>
                <span className={cl.score}>{data.score}</span>
            </div>
        </div>
    );
};

export default Player;
