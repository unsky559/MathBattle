import React from 'react';
import "./closeButton.scss";

type propType = {
    onClick: () => void,
}

const CloseButton = (props: propType) => {
    return (
        <button className="closeButton" onClick={props.onClick}>
            <img src="../static/images/icons/close/close_black_24dp%201.svg" alt="x"/>
        </button>
    );
};

export default CloseButton;
