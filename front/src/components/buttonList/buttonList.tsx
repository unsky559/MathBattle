import React from 'react';
import cl from "./buttonList.module.scss";

type propType = {
    buttons: {
        onclick: () => void,
        title: string
    }[]
}

const ButtonList = (props: propType) => {

    return (
        <div className={cl.buttonList}>
            { props.buttons.map( (btn) => {
                    return (<button
                        onClick={btn.onclick}
                        onKeyPress={btn.onclick}
                        key={Math.random()}
                        className={cl.listableButton}>{btn.title}</button>);
                } )
            }
        </div>);
};

export default ButtonList;
