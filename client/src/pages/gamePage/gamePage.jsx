import React from 'react';
import "./gamePage.scss";
import GameKeyboard from "../../components/gameKeyboard/gameKeyboard";
import ExampleContainer from "../../components/expamleContainer/exampleContainer";
import BlockGameInfo from "../../components/blockGameInfo/blockGameInfo";
import BlockScoreboard from "../../components/blockScoreboard/blockScoreboard";

const GamePage = () => {
    return (
        <div>
            <div className="container">
                <div className="gameLayout">
                    <div className="gameBoard">
                        <div className="innerContainer">
                            <ExampleContainer example="5+5" answer="11"/>
                            <GameKeyboard/>
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
