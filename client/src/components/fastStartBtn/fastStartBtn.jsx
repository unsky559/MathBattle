import React from 'react';
import "./fastStartBtn.scss";
import SmartIcon from "../smartIcon/smartIcon";
import textToIcon from "../../workers/textToIcon";

const FastStartBtn = (props) => {

    const data = props.data;

    return (
        <div className="fastStartBtn" tabIndex="1" onKeyPress={props.onClick} onClick={props.onClick}>
            <div className="foreground">
                <div className="content">
                    <h3 className="startTitle">{ data.name }</h3>
                    <div className="iconRow">
                        <SmartIcon icon="../static/images/icons/people/groups_black_24dp.svg" text={data.settings.max_players}/>
                    </div>
                    {data.settings.modes[0] && <div className="hr"/> }

                    {
                        data.settings.modes[0] && <div className="iconRow">
                        {
                            data.settings.modes.map((mode) => {
                                return <SmartIcon key={Math.random()} gray texty icon={textToIcon(mode.name)} text={mode.difficulty}/>
                            })
                        }
                        </div>
                    }

                </div>
            </div>
            <div className="background">
                <span className="example">1+6</span>
            </div>
        </div>
    );
};

export default FastStartBtn;
