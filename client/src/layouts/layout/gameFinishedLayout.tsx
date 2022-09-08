import React, {Dispatch, SetStateAction} from 'react';
import Button from "../../components/button/button";
import cl from "./gameFinishedLayout.module.scss";
import {useHistory} from "react-router-dom";

type propType = {
    isWin: [boolean, Dispatch<SetStateAction<boolean>>]
}

const GameFinishedLayout = (props: propType) => {
    const history = useHistory();
    const winText = props.isWin[0] ? "Вы победили" : "Вы проиграли";

    const openHomepage = () => {
        history.push("/");
    }

    return (
        <div className={cl.gameFinishedLayout}>
            <h3 className={cl.hTitle}>Игра окончена</h3>
            <p className={cl.p}>{winText}</p>
            <Button text="На главную" onClick={openHomepage}/>
        </div>
    );
};

export default GameFinishedLayout;
