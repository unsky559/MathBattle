import React from 'react';
import cl from "./gameResultRowCard.module.scss";
import Avatar from "../avatar/avatar";
import SmartIcon from "../smartIcon/smartIcon";
import DateController from "../../workers/dateController.ts";
import textToIcon from "../../workers/textToIcon.ts";
import classNames from "classnames";

type propType = {
    lobby: {
        date_end: number,
        result: {
            is_win: boolean,
            rating_changed: number
        },
        setting: {
            win_condition: {
                value: number
            },
            modes: {
                name: string
                difficulty: number
            }[]
        }
    }
}

const GameResultRowCard = (props: propType) => {

    const lobby = props.lobby;
    const dateController = new DateController(lobby.date_end);

    return (
        <section className={cl.gameResults}>
            <div className={cl.gameInfoBlock}>
                <div className={cl.row}>

                    <h1 className={cl.gameHeader}>
                        { lobby.result.is_win ? "Победа" : "Поражение" }
                    </h1>
                    <p className={classNames([cl.secondary, cl.timeBack])}>{ dateController.getTimeLeft() }</p>
                </div>
                <div className={cl.row}>
                    <Avatar/>
                    <div className={cl.col}>
                        <p className={cl.secondary}>
                            Игрок
                        </p>
                        <p className={cl.userLink}><a href="#">Andru7</a></p>
                    </div>
                </div>
                <div className={cl.row}>
                    <SmartIcon icon="../static/images/icons/points/points.svg" text={ lobby.setting.win_condition.value }/>
                </div>
            </div>
            <div className={cl.gameResultsBlock}>


                <div className={classNames(cl.ratingChange, {[cl.increase]: lobby.result.is_win, [cl.decrease]: !lobby.result.is_win})}>
                    <div className={cl.row}>
                        {
                            lobby.result.is_win ?
                            <img src="../static/images/icons/rating/increase.svg" alt=""/>
                            :
                            <img src="../static/images/icons/rating/decrease.svg" alt=""/>
                        }
                        <span className={cl.ratingCount}>{ lobby.result.rating_changed }</span>

                    </div>
                </div>


                <div className={cl.gamemodesRow}>
                    {
                        lobby.setting.modes.map((mode) => {
                            return <SmartIcon key={Math.random()} gray texty icon={textToIcon(mode.name)} text={mode.difficulty}/>
                        })
                    }
                </div>
            </div>
        </section>
    );
};

export default GameResultRowCard;
