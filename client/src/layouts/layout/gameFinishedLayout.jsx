import React from 'react';
import Button from "../../components/button/button";
import "./gameFinishedLayout.scss";
import {useHistory} from "react-router-dom";

const GameFinishedLayout = (props) => {
    const history = useHistory();
    const winText = props.isWin[0] ? "Вы победили" : "Вы проиграли";

    const openHomepage = () => {
        history.push("/");
    }

    return (
        <div className="gameFinishedLayout">
            <h3 className="hTitle">Игра окончена</h3>
            <p className="p">{winText}</p>
            <Button text="На главную" onClick={openHomepage}/>
        </div>
    );
};

export default GameFinishedLayout;
