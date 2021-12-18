import React, {useEffect, useRef, useState} from 'react';
import "./dropdown.scss";
import {set} from "mongoose";

const Dropdown = (props) => {
    const dropdownState = useState(false);
    const dropdownChild = useRef();

    const disableOnFocus = (e) => {
        if(e.target.closest(".dropdown")){
            return;
        }
        if(e.target.closest(".dropdownDrop") == dropdownChild.current.closest(".dropdownDrop")){
            return;
        }
        setTimeout(() => {
            dropdownState[1](false);
        }, 0);
    }

    const disableOnClick = (e) => {
        if(e.target.closest(".userStatus")){
            return;
        }
        setTimeout(() => {
            dropdownState[1](false);
        }, 0);
    }

    const enableDropdownState = () => {
        dropdownState[1](true);
    }

    useEffect(() => {
        if(dropdownState[0]){
            document.addEventListener("focusin", disableOnFocus);
            document.addEventListener("click", disableOnClick);
        }
        return () => {
            document.removeEventListener("focusin", disableOnFocus);
            document.removeEventListener("click", disableOnClick);
        }
    }, [dropdownState[0]]);


    return (
        <div className="dropdown">
            <div className="dropdownHeader"
                 tabIndex={props.tabIndex}
                 onFocus={() => enableDropdownState()}
                 onClick={() => enableDropdownState()}
                 onKeyPress={() => enableDropdownState()}
            >
                { props.header }
            </div>
            {dropdownState[0] &&
                <div ref={dropdownChild} className="dropdownDrop">
                    { props.children }
                </div>
            }
        </div>
    );
};

export default Dropdown;
