import React from 'react';
import "./searchGamePopup.scss";
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
        <div className="searchGamePopup">
            <p className="gameModeName">{gamemode.name}</p>
            <div className="spinnerContainer">
                <Spinner/>
            </div>
            <div className="bottomRow">
                <Button onClick={closePopup} text="Отмена"/>
            </div>
        </div>
    );
};

export default SearchGamePopup;
