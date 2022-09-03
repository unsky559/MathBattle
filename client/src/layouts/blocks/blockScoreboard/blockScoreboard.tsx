import React, {Dispatch, SetStateAction} from 'react';
import "../../../styles/shared/block.scss";
import Player from "../../../components/player/player";
import {userType} from "../../../types/userType";
import {playerType} from "../../../types/playerType";

type propType = {
    scoreboard: [Record<string, any>[], Dispatch<SetStateAction<any[]>>] // TODO: fix scoreboard props
}

const BlockScoreboard = (props: propType) => {

    console.log("SCOREBOARD");
    console.log(props.scoreboard);
    const scoreboard = props.scoreboard;
    const data = scoreboard[0];

    return (
        <div className="block">
            <span className="title">Scoreboard</span>
            <div className="scoreboard">
                {data.map((player: playerType) => {
                    if(player.userdata === null){
                        player.userdata = {
                            username: "Anonymous",
                            userpic: "",
                            stats: {
                                rating: 1000
                            }
                        }
                        player.score = 0;
                    }

                    return <Player player = {player} />
                })}
            </div>
        </div>
    );
};

export default BlockScoreboard;
