import React, {useEffect, useState} from 'react';
import "./gameModes.scss";
import FastStartBtn from "../fastStartBtn/fastStartBtn";
import {apiGetRequest} from "../../webWorkers/apiRequest";
import gameSocket from "../../webWorkers/gameSocket";
import {useDispatch} from "react-redux";

const GameModes = () => {

    const dispatch = useDispatch();
    const gamemodes = useState([]);

    const connectToLobbie = (gameModeId) => {
        const connectionInstance = gameSocket;

        connectionInstance.findGame({"game_preset_id": gameModeId},
            () => {
                console.log("FOUNT");
                dispatch({type: "SEARCH_GAME", val: false});
            },
            () => {
                dispatch({type: "SEARCH_GAME",
                    val: true,
                    cancelEvent: () => {
                        connectionInstance.disconnect();
                    }
                });
            });

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
        <>
            <div className="gameModes">
                <h3 className="title">Разогрев</h3>
                <div className="row">
                    {
                        gamemodes[0].map((gamemode, index) => {
                            return <FastStartBtn key={index} data={gamemode} onClick={() => {
                                    connectToLobbie(gamemode['_id']);
                                }
                            }/>
                        })
                    }

                </div>
            </div>
        </>
    );
};

export default GameModes;
