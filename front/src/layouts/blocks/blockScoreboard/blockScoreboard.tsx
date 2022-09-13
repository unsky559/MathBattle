import React, {Dispatch, SetStateAction} from 'react';
import cl from "./blockScoreboard.module.scss";
import Player from "../../../components/player/player";
import {playerType} from "../../../types/playerType";

type propType = {
    scoreboard: [Record<string, any>[], Dispatch<SetStateAction<any[]>>] // TODO: fix scoreboard props
}

const BlockScoreboard = (props: propType) => {

    const scoreboard = props.scoreboard;
    const data = scoreboard[0];

    return (
        <div className={cl.block}>
            <span className={cl.title}>Scoreboard</span>
            <div className={cl.scoreboard}>
                {data.map((player: playerType) => {
                    if(player.userdata === null){
                        player.userdata = {
                            username: "Anonymous",
                            userpic: "",
                            stats: {
                                rating: 1000
                            }
                        }
                    }

                    return <Player player = {player} />
                })}
            </div>
        </div>
    );
};

export default BlockScoreboard;
