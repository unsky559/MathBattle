import React from 'react';
import "./exampleContainer.scss";

const ExampleContainer = (props) => {
    return (
        <div className="exampleContainer">
            <div className="example">
                { props.example }
            </div>
            <div className="answerArea">
                { props.answer }
            </div>
        </div>
    );
};

export default ExampleContainer;
