import React from 'react';
import cl from "./fastStartBtn.module.scss";
import SmartIcon from "../smartIcon/smartIcon";
import textToIcon from "../../workers/textToIcon.ts";

type ModeType = {
    name: string,
    difficulty: string
}

type propType = {
    onClick: () => void,
    data: {
        name: string,
        settings: {
            modes: ModeType[],
            max_players: string,
        }
    }
}

const FastStartBtn = (props: propType) => {

    const data = props.data;

    return (
        <div className={cl.fastStartBtn} tabIndex={1} onKeyPress={props.onClick} onClick={props.onClick}>
            <div className={cl.foreground}>
                <div className={cl.content}>
                    <h3 className={cl.startTitle}>{ data.name }</h3>
                    <div className={cl.iconRow}>
                        <SmartIcon icon="../static/images/icons/people/groups_black_24dp.svg" text={data.settings.max_players}/>
                    </div>
                    {data.settings.modes[0] && <div className={cl.hr}/> }

                    {
                        data.settings.modes[0] && <div className={cl.iconRow}>
                        {
                            data.settings.modes.map((mode: ModeType) => {
                                return <SmartIcon key={Math.random()} gray texty icon={textToIcon(mode.name)} text={mode.difficulty}/>
                            })
                        }
                        </div>
                    }

                </div>
            </div>
            <div className={cl.background}>
                <span className={cl.example}>2+2</span>
            </div>
        </div>
    );
};

export default FastStartBtn;
