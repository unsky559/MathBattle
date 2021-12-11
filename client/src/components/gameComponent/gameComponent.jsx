import React, {useState} from 'react';
import ExampleContainer from "../expamleContainer/exampleContainer";
import GameKeyboard from "../gameKeyboard/gameKeyboard";

const GameComponent = () => {

    const inputState = useState([]);

    console.log(inputState[0]);

    return (
        <div>
            <ExampleContainer example="5+5" answer={inputState[0]}/>
            <GameKeyboard inputState = {inputState}/>
        </div>
    );
};

export default GameComponent;
