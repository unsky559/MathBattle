import React from 'react';
import "./userPage.scss";
import Avatar from "../../components/avatar/avatar";
import SmartIcon from "../../components/smartIcon/smartIcon";
import OnlineHandler from "../../components/onlineHandler/onlineHandler";
import GameResultRowCard from "../../components/gameResultRowCard/gameResultRowCard";

const UserPage = () => {
    return (
        <div className="userPage container">
            <div className="userContainer">
                <div className="block">
                    <div className="userInfo">
                        <Avatar big/>
                        <div className="userData">
                            <div className="infoRow">
                                <h1 className="userName">unsky559</h1>
                                <SmartIcon icon="../static/images/icons/rating/bubble_chart_black_24dp 1.svg" yellow text="550"/>
                            </div>
                            <div className="infoRow">
                                <OnlineHandler type="online"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contentContainer">
                <GameResultRowCard/>
            </div>
        </div>
    );
};

export default UserPage;
