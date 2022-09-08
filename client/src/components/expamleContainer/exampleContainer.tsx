import React, {Dispatch, SetStateAction} from 'react';
import cl from "./exampleContainer.module.scss";

type propType = {
    loadingExpressionState: [boolean, Dispatch<SetStateAction<boolean>>],
    example: string,
    answer: string[]
}

const ExampleContainer = (props: propType) => {
    const loadingExpressionState = props.loadingExpressionState;

    return (
        <div className={cl.exampleContainer}>
            <div className={[cl.example, loadingExpressionState[0] ? cl.loading : ""].join(" ")}>
                { props.example }
            </div>
            <div className={cl.answerArea}>
                { props.answer.map((value, index) => {
                    return <span key={index}>{value}</span>
                }) }
            </div>
        </div>
    );
};

export default ExampleContainer;
