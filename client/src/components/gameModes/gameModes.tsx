import React, {useEffect, useState} from 'react';
import "./gameModes.scss";
import FastStartBtn from "../fastStartBtn/fastStartBtn";
import {apiGetRequest} from "../../webWorkers/apiRequest.ts";
import gameSocket from "../../webWorkers/gameSocket.ts";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

const GameModes = () => {

    const dispatch = useDispatch();
    const gamemodes = useState([]);
    const history = useHistory();

    const searchGame = (gamemode: { '_id': string }) => {
        const connectionInstance = gameSocket;
        const gameModeId = gamemode['_id'];

        const onFound = (data: string) => {
            dispatch({type: "SEARCH_GAME", val: false});
            history.push('/game/'+data);
        }

        const beforeFound = () => {
            dispatch({type: "SEARCH_GAME",
                val: true,
                gamemode: gamemode,
                cancelEvent: () => {
                    connectionInstance.stopFindingGame();
                }
            });
        }

        connectionInstance.findGame({"game_preset_id": gameModeId}, onFound, beforeFound);

        return;
    }

    useEffect(() => {
        apiGetRequest("gamepresets").then((r: Response) => {
            return r.json();
        }).then((data: any[]) => {
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
                                    searchGame(gamemode);
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
