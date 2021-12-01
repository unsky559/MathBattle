import React from 'react';
import "../../styles/shared/block.scss";
import Player from "../player/player";

const BlockScoreboard = () => {
    return (
        <div className="block">
            <span className="title">Игроки</span>
            <div className="scoreboard">
                <Player/>
                <Player/>
            </div>
        </div>
    );
};

export default BlockScoreboard;
