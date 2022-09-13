import React from 'react';
import cl from "./popup.module.scss";
import CloseButton from "../closeButton/closeButton";
import classNames from "classnames";

const Popup = (props) => {

    let titleClose = props.titleClose;
    const closePopup = () => {
        if(!props.nonClosable){
            props.setActive(false);
        }
    }

    return props.isActive && (
        <div className={cl.popupContainer} >
            <div className={cl.popupBackground} onClick={closePopup}></div>
            <div className={cl.container}>
                <div className={cl.popupWindow}>
                    <div className={cl.popupHeader}>
                        <h3 className={classNames(cl.popupHeadTitle, {[cl.center]: !titleClose})}>{ props.title }</h3>
                        { titleClose ? <CloseButton onClick={closePopup}/> : "" }
                    </div>
                    { props.children }
                </div>
            </div>
        </div>
    );
};

export default Popup;
