import React from 'react';
import "./gameResultRowCard.scss";
import Avatar from "../avatar/avatar";
import SmartIcon from "../smartIcon/smartIcon";
import DateController from "../../workers/dateController";
import textToIcon from "../../workers/textToIcon";

const GameResultRowCard = (props) => {

    const lobby = props.lobby;
    const dateController = new DateController(lobby.date_end);

    return (
        <section className="gameResults">
            <div className="gameInfoBlock">
                <div className="row">

                    <h1 className="gameHeader">
                        { lobby.result.is_win ? "Победа" : "Поражение" }
                    </h1>
                    <p className="secondary timeBack">{ dateController.getTimeLeft() }</p>
                </div>
                <div className="row">
                    <Avatar/>
                    <div className="col">
                        <p className="secondary">
                            Игрок
                        </p>
                        <p className="userLink"><a href="#">Andru7</a></p>
                    </div>
                </div>
                <div className="row">
                    <SmartIcon icon="../static/images/icons/points/points.svg" text={ lobby.setting.win_condition.value }/>
                </div>
            </div>
            <div className="gameResultsBlock">

                {
                    lobby.result.is_win &&
                    <div className="ratingChange increase">
                        <div className="row">
                            <img src="../static/images/icons/rating/increase.svg" alt=""/>
                            <span className="ratingCount"> { lobby.result.rating_changed }</span>
                        </div>
                    </div>
                }
                {
                    !lobby.result.is_win &&
                    <div className="ratingChange decrease">
                        <div className="row">
                            <img src="../static/images/icons/rating/decrease.svg" alt=""/>
                            <span className="ratingCount">{ -lobby.result.rating_changed }</span>
                        </div>
                    </div>
                }

                <div className="gamemodesRow">
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
