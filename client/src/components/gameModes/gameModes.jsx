import React from 'react';
import "./gameModes.scss";
import FastStartBtn from "../fastStartBtn/fastStartBtn";

const GameModes = () => {
    return (
        <div className="gameModes">
            <h3 className="title">Разогрев</h3>
            <div className="row">
                <div className="col">
                    <FastStartBtn/>
                </div>
                <div className="col">
                    <FastStartBtn/>
                </div>
                <div className="col">
                    <FastStartBtn/>
                </div>
                <div className="col">
                    <FastStartBtn/>
                </div>
                <div className="col">
                    <FastStartBtn/>
                </div>
                <div className="col">
                    <FastStartBtn/>
                </div>
            </div>
        </div>
    );
};

export default GameModes;
