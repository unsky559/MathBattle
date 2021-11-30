import React from 'react';
import "./gamePage.scss";
import SmartIcon from "../../components/smartIcon/smartIcon";

const GamePage = () => {
    return (
        <div>
            <div className="container">

                <div className="gameLayout">
                    <div className="gameBoard">
                        <div className="innerContainer">
                            <div className="exampleContainer">
                                <div className="example">
                                    100+100
                                </div>
                                <div className="answerArea">
                                    300

                                </div>
                            </div>
                            <div className="keyboard">
                                <div className="key"><button>7</button></div>
                                <div className="key"><button>8</button></div>
                                <div className="key"><button>9</button></div>
                                <div className="key"><button>C</button></div>

                                <div className="key"><button>4</button></div>
                                <div className="key"><button>5</button></div>
                                <div className="key"><button>6</button></div>
                                <div className="key"><button>-</button></div>

                                <div className="kBtnRow">
                                    <div className="buttons">
                                        <div className="key"><button>1</button></div>
                                        <div className="key"><button>2</button></div>
                                        <div className="key"><button>3</button></div>
                                        <div className="key zero"><button>0</button></div>
                                        <div className="key"><button>.</button></div>
                                    </div>

                                    <div className="key ok"><button>ok</button></div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="statusBar">
                        <div className="block">
                            <span className="title">Игра</span>
                            <div className="lobbyInfo">
                                <div className="avatar">
                                    <img src="https://thispersondoesnotexist.com/image" alt=""/>
                                </div>
                                <div className="info">
                                    <span className="secondary">Соревновательная</span>
                                    <div className="players">
                                        <a href="#">Playername</a> <span className="secondary">vs</span> <a
                                        href="#">Another</a>
                                    </div>

                                </div>
                            </div>
                            <div className="gameModesRow">
                                <SmartIcon text="2/2" />
                                <SmartIcon text="100" />
                                <SmartIcon text="480" />
                            </div>
                        </div>
                        <div className="block">
                            <span className="title">Игроки</span>
                            <div className="scoreboard">
                                <div className="player">
                                    <div className="lobbyInfo">
                                        <div className="avatar">
                                            <img src="https://thispersondoesnotexist.com/image" alt=""/>
                                        </div>
                                        <div className="info">
                                            <a className="playerName" href="#">Playername</a>
                                            <SmartIcon text="225"/>
                                        </div>
                                        <span className="score">50</span>
                                    </div>
                                </div>
                                <div className="player">
                                    <div className="lobbyInfo">
                                        <div className="avatar">
                                            <img src="https://thispersondoesnotexist.com/image" alt=""/>
                                        </div>
                                        <div className="info">
                                            <a className="playerName" href="#">Playername</a>
                                            <SmartIcon text="225"/>
                                        </div>
                                        <span className="score">50</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default GamePage;
