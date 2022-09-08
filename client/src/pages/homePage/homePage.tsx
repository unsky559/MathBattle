import React from "react";
import Tabbed from "../../components/tabbed/tabbed";
import GameModes from "../../components/gameModes/gameModes";
import cl from "./homePage.module.scss";

function HomePage(){
    return (
        <div className={cl.container}>
            <div className={cl.containerMainFlow}>
                <Tabbed>
                    <GameModes/>
                </Tabbed>
            </div>
        </div>
    );
}

export default HomePage;
