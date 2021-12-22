import React from 'react';
import "../../../styles/shared/block.scss";
import Player from "../../../components/player/player";

const BlockScoreboard = (props) => {

    const scoreboard = props.scoreboard;
    const data = scoreboard[0];

    return (
        <div className="block">
            <span className="title">Scoreboard</span>
            <div className="scoreboard">
                {data.map((player) => {
                    console.log(player);

                    if(player.userdata === null){
                        player.userdata = {
                            username: "Anonymous"
                        }
                    }

                    return <Player player = {player} />
                })}
            </div>
        </div>
    );
};

export default BlockScoreboard;
