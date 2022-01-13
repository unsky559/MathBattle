import React, {useState} from 'react';
import "./exampleContainer.scss";

const ExampleContainer = (props) => {
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
