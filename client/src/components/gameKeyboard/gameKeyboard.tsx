import React, {Dispatch, SetStateAction, useEffect} from 'react';
import "./gameKeyboard.scss";
import GameKey from "../gameKey/gameKey";

const allowedKeys = ['0','1','2','3','4','5','6','7','8','9','-','.',',','Enter','Escape','Backspace'];

type propType = {
    inputState: [string[], Dispatch<SetStateAction<string[]>>],
    onEnter: () => void,
}

const GameKeyboard = (props: propType) => {

    const keyInput = (key: string, inputState = props.inputState) => {
        return () => {
            if(key === "-" && inputState[0].length !== 0){
                return;
            }
            if(key === "."){
                if(inputState[0].findIndex(elem => elem === ".") !== -1){
                    return;
                }
                if(inputState[0].length === 0 || inputState[0][0] === "-"){
                    inputState[1](inputState[0].concat('0', "."));
                    return;
                }
            }
            if(inputState[0].length < 11){
                inputState[1](inputState[0].concat(key));
            }
        }
    }

    const backSpace = (inputState = props.inputState) => {
        return () => {
            const arr = inputState[0].slice();
            arr.pop();
            inputState[1](arr);
        }
    }

    const clenAll = (inputState = props.inputState) => {
        return () => { inputState[1]([]) }
    }

    const enter = (inputState = props.inputState) => {
        return () => {
            props.onEnter();
            return;
        }
    }

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if(allowedKeys.includes(e.key)){
                if(e.key === "Enter"){
                    enter()();
                    return;
                }
                if(e.key === "Escape"){
                    clenAll()();
                    return;
                }
                if(e.key === "Backspace"){
                    backSpace()();
                    return;
                }

                if(e.key === ","){
                    keyInput(".")();
                    return;
                }
                keyInput(e.key)();
            }
        };
        window.addEventListener("keydown", listener);
        return () => {
            window.removeEventListener("keydown", listener);
        }
    });

    return (
        <div className="keyboard">
            <GameKey text="7" onClick={keyInput("7")} />
            <GameKey text="8" onClick={keyInput("8")}/>
            <GameKey text="9" onClick={keyInput("9")}/>
            <GameKey text="🠔" onClick={backSpace()}/>

            <GameKey text="4" onClick={keyInput("4")}/>
            <GameKey text="5" onClick={keyInput("5")}/>
            <GameKey text="6" onClick={keyInput("6")}/>
            <GameKey text="-" onClick={keyInput("-")}/>

            <div className="kBtnRow">
                <div className="buttons">
                    <GameKey text="1" onClick={keyInput("1")}/>
                    <GameKey text="2" onClick={keyInput("2")}/>
                    <GameKey text="3" onClick={keyInput("3")}/>
                    <GameKey text="0" isZero onClick={keyInput("0")}/>
                    <GameKey text="." onClick={keyInput(".")}/>
                </div>
                <GameKey text="ok" isOk onClick={enter()}/>
            </div>

        </div>
    );
};

export default GameKeyboard;
