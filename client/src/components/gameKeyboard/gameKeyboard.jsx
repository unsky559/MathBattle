import React from 'react';
import "./gameKeyboard.scss";
import GameKey from "../gameKey/gameKey";

const GameKeyboard = () => {
    return (
        <div className="keyboard">
            <GameKey text="7" />
            <GameKey text="8" />
            <GameKey text="9" />
            <GameKey text="C" />

            <GameKey text="4" />
            <GameKey text="5" />
            <GameKey text="6" />
            <GameKey text="-" />

            <div className="kBtnRow">
                <div className="buttons">
                    <GameKey text="1" />
                    <GameKey text="2" />
                    <GameKey text="3" />
                    <GameKey text="0" isZero />
                    <GameKey text="." />
                </div>
                <GameKey text="ok" isOk />
            </div>

        </div>
    );
};

export default GameKeyboard;
