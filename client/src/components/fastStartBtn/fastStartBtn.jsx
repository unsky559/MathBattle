import React from 'react';
import "./fastStartBtn.scss";

const FastStartBtn = () => {
    return (
        <div className="fastStartBtn">
            <div className="foreground">
                <div className="content">
                    <h3 className="startTitle">Реакция</h3>
                    <div className="iconRow">
                        <div className="iconicInfo">
                            <div className="iconicIcon">

                            </div>
                            <div className="iconicData">
                                1s
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="background">
                <span className="example">1+6</span>
            </div>
        </div>
    );
};

export default FastStartBtn;
