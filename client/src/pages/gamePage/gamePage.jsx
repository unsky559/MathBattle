import React, {useEffect, useState} from 'react';
import "./gamePage.scss";
import BlockScoreboard from "../../layouts/blocks/blockScoreboard/blockScoreboard";
import GameComponent from "../../components/gameComponent/gameComponent";
import {matchPath, useHistory} from "react-router-dom";
import gameSocket from "../../webWorkers/gameSocket";
import {newExpressionAudio, startGameAudio} from "../../workers/audioController";
import GameFinishedLayout from "../../layouts/layout/gameFinishedLayout";

const GamePage = () => {
    const history = useHistory();
    const currentConnection = gameSocket;
    const scoreboardState = useState([]);
    const gameFinished = useState(false);
    const isWin = useState(false);
    const loadingExpressionState = useState(true);
    const currentExpressionState = useState("");
    let isFirstExpressionState = true;

    const playSound = () => {
        newExpressionAudio.currentTime = 0;
        newExpressionAudio.play();
    }

    const playStartSound = () => {
        startGameAudio.currentTime = 0;
        startGameAudio.play();
    }

    const onExpression = (expression) => {
        if(isFirstExpressionState){
            isFirstExpressionState = false;
        }else{
            playSound()
        }
        loadingExpressionState[1](true);
        setTimeout(() => {
            currentExpressionState[1](expression);
            loadingExpressionState[1](false);
        }, 300);
    }

    const onPlayerChange = (data) => {
        console.log(data);
        scoreboardState[1](data);
    }

    const onLobbySettings = (data) => {
        console.log(data);
    }

    const onGameFinished = (data) => {
        playStartSound();
        gameFinished[1](true);
        isWin[1](data);
        currentConnection.leftLobby();
    }

    const connectTo = (serverId) => {
        if(currentConnection.isConnected()){
            const lobbyEvents = { onExpression, onPlayerChange, onLobbySettings, onGameFinished}
            currentConnection.joinLobby(serverId, lobbyEvents);
            playStartSound();
        }else{
            history.push("/");
        }
    }

    useEffect(() => {
        const page = matchPath(window.location.pathname, {
            path: "/game/:id",
            exact: true,
            strict: true
        });
        connectTo(page.params.id);
        return () => {
            gameFinished[1](true);
            currentConnection.leftLobby();
        }
    }, []);

    return (
        <div>
            <div className="container">
                <div className="gameLayout">
                    <div className="gameBoard">
                        <div className="innerContainer">
                            {
                                gameFinished[0] ?
                                    <GameFinishedLayout isWin={isWin}/>
                                    :
                                    <GameComponent
                                        loadingExpressionState={loadingExpressionState}
                                        currentExpressionState={currentExpressionState}
                                    />
                            }
                        </div>
                    </div>
                    <div className="statusBar">
                        {/*<BlockGameInfo/>*/}
                        <BlockScoreboard scoreboard={scoreboardState}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GamePage;
