import React, {useState} from 'react';
import "./exampleContainer.scss";

const ExampleContainer = (props) => {
    const exampleLoading = useState(true);

    return (
        <div className="exampleContainer">
            <div className={["example", exampleLoading ? "loading" : ""].join(" ")}>
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
