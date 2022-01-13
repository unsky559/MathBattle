import React, {useEffect, useState} from 'react';
import "./userPage.scss";
import Avatar from "../../components/avatar/avatar";
import SmartIcon from "../../components/smartIcon/smartIcon";
import OnlineHandler from "../../components/onlineHandler/onlineHandler";
import GameResultRowCard from "../../components/gameResultRowCard/gameResultRowCard";
import {apiGetRequest} from "../../webWorkers/apiRequest";
import {matchPath} from "react-router-dom";

const UserPage = () => {

    const [user, updateUserState] = useState({
        "stats": {
            "rating": 0,
            "finished_lobbies": []
        },
        "email": "",
        "username": "",
        "date_reg": ""
    });

    useEffect(() => {
        const page = matchPath(window.location.pathname, {
            path: "/user/:username",
            exact: true,
            strict: true
        });

        apiGetRequest(`user/${page.params.username}`).then((resp) => {
            return resp.json();
        }).then((data) => {
            updateUserState(data);
            console.log(data);
        })
    }, []);

    return (
        <div className="userPage container">
            <div className="userContainer">
                <div className="block">
                    <div className="userInfo">
                        <Avatar big/>
                        <div className="userData">
                            <div className="infoRow">
                                <h1 className="userName">{user.username}</h1>
                                <SmartIcon icon="../static/images/icons/rating/bubble_chart_black_24dp 1.svg" yellow text={user.stats.rating}/>
                            </div>
                            <div className="infoRow">
                                <OnlineHandler type="online"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contentContainer">
                {
                    user.stats.finished_lobbies.map((lobby) => {
                        return <GameResultRowCard key={Math.random()} lobby={lobby}/>
                    })
                }
            </div>
        </div>
    );
};

export default UserPage;
