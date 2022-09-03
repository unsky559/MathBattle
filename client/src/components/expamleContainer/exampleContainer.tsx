import React, {Dispatch, SetStateAction, useState} from 'react';
import "./exampleContainer.scss";

type propType = {
    loadingExpressionState: [boolean, Dispatch<SetStateAction<boolean>>],
    example: string,
    answer: string[]
}

const ExampleContainer = (props: propType) => {
    const loadingExpressionState = props.loadingExpressionState;

    return (
        <div className="exampleContainer">
            <div className={["example", loadingExpressionState[0] ? "loading" : ""].join(" ")}>
                { props.example }
            </div>
            <div className="answerArea">
                { props.answer.map((value, index) => {
                    return <span key={index}>{value}</span>
                }) }
            </div>
        </div>
    );
};

export default ExampleContainer;
