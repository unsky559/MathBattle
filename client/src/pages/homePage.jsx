import React from "react";
import Tabbed from "../components/tabbed/tabbed";
import GameModes from "../components/gameModes/gameModes";

function HomePage(){
    return (
        <div className="container min-height">
            <div className="container-main-flow">

                <Tabbed>
                    <GameModes/>
                </Tabbed>

            </div>
        </div>
    );
}

export default HomePage;
