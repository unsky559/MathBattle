import React from 'react';
import cl from "./closeButton.module.scss";

type propType = {
    onClick: () => void,
}

const CloseButton = (props: propType) => {
    return (
        <button className={cl.closeButton} onClick={props.onClick}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.3333 8.54667L23.4533 6.66667L16 14.12L8.54663 6.66667L6.66663 8.54667L14.12 16L6.66663 23.4533L8.54663 25.3333L16 17.88L23.4533 25.3333L25.3333 23.4533L17.88 16L25.3333 8.54667Z" fill="black"/>
            </svg>
        </button>
    );
};

export default CloseButton;
