import React from 'react';
import "./searchGamePopup.scss";
import Spinner from "../../../components/spinner/spinner";
import Button from "../../../components/button/button";
import {useDispatch, useSelector} from "react-redux";

const SearchGamePopup = (props) => {

    const dispatch = useDispatch();
    const cancelEvent = useSelector(state => state.cancelEvent);

    function closePopup() {
        cancelEvent.call();
        dispatch({type: "SEARCH_GAME", val: false});
    }

    return (
        <div className="searchGamePopup">
            <p className="gameModeName">Simple and fast</p>
            <div className="spinnerContainer">
                <Spinner/>
            </div>
            <div className="bottomRow">
                <Button onClick={closePopup} text="Cancel"/>
            </div>
        </div>
    );
};

export default SearchGamePopup;
