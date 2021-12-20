import React from 'react';
import Button from "../../components/button/button";
import "./gameFinishedLayout.scss";

const GameFinishedLayout = (props) => {
    const winText = props.isWin[0] ? "Вы победили" : "Вы проиграли";
    return (
        <div className="gameFinishedLayout">
            <h3 className="hTitle">Игра окончена</h3>
            <p className="p">{winText}</p>
            <Button text="На главную"/>
        </div>
    );
};

export default GameFinishedLayout;
