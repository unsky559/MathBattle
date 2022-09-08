import React from 'react';
import SmartIcon from "../../../components/smartIcon/smartIcon";

import "../../../styles/shared/block.scss";
import cl from "./blockGameInfo.module.scss";
import Avatar from "../../../components/avatar/avatar";

const BlockGameInfo = () => {
    return (
        <div className={cl.block}>
            <span>Игра</span>
            <div className={cl.lobbyInfo}>
                <Avatar/>
                <div className={cl.info}>
                    <span className={cl.secondary}>Соревновательная</span>
                    <div className={cl.players}>
                        <a href="#">Playername</a> <span className={cl.secondary}>vs</span> <a
                        href="#">Another</a>
                    </div>
                </div>
            </div>
            <div className={cl.gameModesRow}>
                <SmartIcon text="2/2" />
                <SmartIcon text="100" />
                <SmartIcon text="480" />
            </div>
        </div>
    );
};

export default BlockGameInfo;
