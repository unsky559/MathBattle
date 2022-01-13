import React, {useState} from 'react';
import ExampleContainer from "../expamleContainer/exampleContainer";
import GameKeyboard from "../gameKeyboard/gameKeyboard";
import gameSocket from "../../webWorkers/gameSocket";

const GameComponent = (props) => {

    const inputState = useState([]);
    const loadingExpressionState = props.loadingExpressionState;
    const currentExpressionState = props.currentExpressionState;

    const onEnter = () => {
        const currentConnection = gameSocket;
        currentConnection.answer(inputState[0].join(""));
        inputState[1]([]);
    }

    return (
        <div>
            <ExampleContainer
                example={currentExpressionState[0]}
                answer={inputState[0]}
                loadingExpressionState={loadingExpressionState}/>
            <GameKeyboard onEnter={onEnter} inputState={inputState}/>
        </div>
    );
};

export default GameComponent;
