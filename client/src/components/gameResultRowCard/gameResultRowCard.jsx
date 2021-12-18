import React from 'react';
import "./gameResultRowCard.scss";
import Avatar from "../avatar/avatar";
import SmartIcon from "../smartIcon/smartIcon";

const GameResultRowCard = () => {
    return (
        <section className="gameResults">
            <div className="gameInfoBlock">
                <div className="row">
                    <h1 className="gameHeader">Победа</h1>
                    <p className="secondary timeBack">20 минут назад</p>
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
                    <SmartIcon/>
                </div>
            </div>
            <div className="gameResultsBlock">
                <div className="ratingChange decrease">
                    <div className="row">
                        <img src="../static/images/icons/rating/decrease.svg" alt=""/>
                        <span className="ratingCount">10</span>
                    </div>
                </div>
                <div className="gamemodesRow">
                    <SmartIcon gray text="1"/>
                    <SmartIcon gray text="2"/>
                    <SmartIcon gray text="1"/>
                    <SmartIcon gray text="1"/>
                </div>
            </div>
        </section>
    );
};

export default GameResultRowCard;
