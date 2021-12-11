import React from 'react';
import "./gamePage.scss";
import BlockGameInfo from "../../components/blockGameInfo/blockGameInfo";
import BlockScoreboard from "../../components/blockScoreboard/blockScoreboard";
import GameComponent from "../../components/gameComponent/gameComponent";

const GamePage = () => {
    return (
        <div>
            <div className="container">
                <div className="gameLayout">
                    <div className="gameBoard">
                        <div className="innerContainer">
                            <GameComponent/>
                        </div>
                    </div>
                    <div className="statusBar">
                        <BlockGameInfo/>
                        <BlockScoreboard/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GamePage;
