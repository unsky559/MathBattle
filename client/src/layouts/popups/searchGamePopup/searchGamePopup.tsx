import React from 'react';
import cl from "./searchGamePopup.module.scss";
import Spinner from "../../../components/spinner/spinner";
import Button from "../../../components/button/button";
import {useDispatch, useSelector} from "react-redux";
import {defatultStateType} from "../../../index";

const SearchGamePopup = () => {

    const dispatch = useDispatch();
    const cancelEvent = useSelector<defatultStateType>(state => state.cancelEvent) as () => boolean;
    const gamemode = useSelector<defatultStateType>(state => state.gamemode) as {name: string}; // TODO: add gamemode types

    function closePopup() {
        cancelEvent();
        dispatch({type: "SEARCH_GAME", val: false});
    }

    return (
        <div className={cl.searchGamePopup}>
            <p className={cl.gameModeName}>{gamemode.name}</p>
            <div className={cl.spinnerContainer}>
                <Spinner/>
            </div>
            <div className={cl.bottomRow}>
                <Button onClick={closePopup} text="Отмена"/>
            </div>
        </div>
    );
};

export default SearchGamePopup;
