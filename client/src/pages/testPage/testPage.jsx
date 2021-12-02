import React, {useEffect, useState} from 'react';
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import {io} from "socket.io-client";

const TestPage = () => {

    let connectedState = useState(false);

    useEffect(() => {
        let socket = io();
        connectedState[1](socket.connected);
    });

    return (
        <div>
            <div className="container">
                <div className="block">
                    <span className="title">Status</span>
                    <br/>
                    <pre>
                        Connected: { connectedState[0].toString() }
                    </pre>
                </div>
                <div className="block">
                    <span className="title">Create random emit socket</span>
                    <Input placeholder="Socket"/>
                    <textarea name="n" id="" cols="30" rows="10" defaultValue="{}"></textarea> <br/>
                    <Button text="send"/>
                </div>
            </div>

        </div>
    );
};

export default TestPage;
