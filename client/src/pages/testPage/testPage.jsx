import React, {useEffect, useState} from 'react';
import Input from "../../components/input/input";


const TestPage = () => {

    const conn = useState( io("http://localhost:3000", {autoConnect: false}) );
    const connectedState = useState(false);
    const socketInput = useState('');
    const socketData = useState('');

    console.log('TestPage');

    //let test = 0;

    useEffect( () => {
        conn[0].on("connect", (socket) => {
            connectedState[1](conn[0].id);
        });
    
        conn[0].on("disconnect", () => {
            connectedState[1](false);
        });

        conn[0].on("game_found", (room_id) => {
            console.log('test!');
            conn[0].emit('join_lobby', room_id);
        });
        //conn[0].on("new_math_expression", (expression) => {
        //    conn[0].emit('answer', 20);
        //});

        conn[0].onAny((evek, arg) => {
            console.log(`event ${evek}`);
            console.log("args ---->", arg);
            //console.log(conn[0]);
        });
    }, []);
    
/*
    conn[0].on("connect", (socket) => {
        connectedState[1](conn[0].id);
    });

    conn[0].on("disconnect", () => {
        connectedState[1](false);
    });
*/
    function disconnect() {
        conn[0].disconnect();
    }

    function connect() {
        const newConn = conn[0].connect();
        conn[1](newConn);
    }

    function createEmit() {
        console.log("send");
        console.log(conn[0]);
        conn[0].emit(socketInput[0].toString(), socketData[0].toString());
    }

    return (
        <div>
            <div className="container">
                <div className="block">
                    <span className="title">Status</span>
                    <br/>
                    <pre>
                        Connected: { conn[0].connected.toString() } <br/>
                        Id: { conn[0].connected ? conn[0].id.toString() : "" } <br/>
                        { socketInput[0] ? "Emit name: " + socketInput[0] : "Enter emit name!"} <br/>
                        { socketData[0] }
                    </pre>
                    { conn[0].connected ? <Button text="disConnect" onClick={disconnect}/> : <Button text="connect" onClick={connect} /> }
                </div>
                <div className="block">
                    <span className="title">Create random emit socket</span>
                    <Input placeholder="Socket" textState={socketInput}/>
                    <textarea name="n" id="" cols="30" rows="10" defaultValue="{}" onInput={(e) => {
                        socketData[1](e.target.value);
                    }}></textarea> <br/>
                    { socketInput[0] && socketData[0] ? <Button text="send" onClick={createEmit}/> : "" }
                </div>
            </div>

        </div>
    );
};
import Button from "../../components/button/button";

import {io} from "socket.io-client";
import {connection} from "mongoose";

export default TestPage;
