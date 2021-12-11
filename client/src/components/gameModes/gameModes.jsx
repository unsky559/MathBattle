import React, {useEffect, useState} from 'react';
import "./gameModes.scss";
import FastStartBtn from "../fastStartBtn/fastStartBtn";
import {apiGetRequest} from "../../webWorkers/apiRequest";

const GameModes = () => {

    const gamemodes = useState([]);

    const connectToLobbie = () => {
        return;
    }

    useEffect(() => {
        apiGetRequest("gamepresets").then((r) => {
            return r.json();
        }).then((data) => {
            gamemodes[1](data);
        });
    }, []);

    return (
        <div className="gameModes">
            <h3 className="title">Разогрев</h3>
            <div className="row">
                {
                    gamemodes[0].map((gamemode, index) => {
                        return <FastStartBtn key={index} data={gamemode} onClick={() => {
                                console.log(gamemode._id);
                                connectToLobbie();
                            }
                        }/>
                    })
                }

            </div>
        </div>
    );
};

export default GameModes;
