import React, {useState} from 'react';
import "./popup.scss";
import CloseButton from "../closeButton/closeButton";

const Popup = (props) => {

    let titleClose = props.titleClose;
    const closePopup = () => {
        if(!props.nonClosable){
            props.setActive(false);
        }
    }

    return props.isActive && (
        <div className="popupContainer" >
            <div className="popupBackground" onClick={closePopup}></div>
            <div className="container">
                <div className="popupWindow">
                    <div className="popupHeader">
                        <h3 className={["popupHeadTitle", ! titleClose ? "center" : ""].join(" ")}>{ props.title }</h3>
                        { titleClose ? <CloseButton onClick={closePopup}/> : "" }
                    </div>
                    { props.children }
                </div>
            </div>
        </div>
    );
};

export default Popup;
