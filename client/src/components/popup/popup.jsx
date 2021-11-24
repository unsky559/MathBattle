import React, {useState} from 'react';
import "./popup.scss";

const Popup = (props) => {

    const closePopup = () => {
        props.setActive(false);
    }

    return props.isActive && (
        <div className="popupContainer" >
            <div className="popupBackground" onClick={closePopup}></div>
            <div className="container">
                <div className="popupWindow">
                    <div className="popupHeader">
                        <h3 className="popupHeadTitle">{ props.title }</h3>
                        <button className="popupClose" onClick={closePopup}>х</button>
                    </div>
                    { props.children }
                </div>
            </div>
        </div>
    );
};

export default Popup;
