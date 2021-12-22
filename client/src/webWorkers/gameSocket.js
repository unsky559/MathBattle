import {io} from "socket.io-client";

class gameSocket {
    constructor() {
        this.connection = io("/", {autoConnect: false});
        this.connected = false;
        this.connectionListeners();
    }

    isConnected() {
        return this.connected;
    }

    connectionListeners() {
        this.connection.on("connect", () => {
            console.log(this.connection);
            this.connected = true;
        });

        this.connection.on("disconnect", () => {
            console.log(this.connection);
            this.connected = false;
        });
    }

    answer(answer){
        this.connection.emit("answer", {answer: parseFloat(answer)});
    }

    findGame(preset_id, onFound, beforeFound) {
        beforeFound.call();
        this.connection = this.connection.connect();
        this.connection.emit("find_game", preset_id);
        this.connection.on("game_found", onFound);
    }

    stopFindingGame() {
        this.disconnect();
        this.connection.off("game_found");
    }

    joinLobby(lobby_id, lobbieEvents){
        this.connection.emit("join_lobby", lobby_id);
        this.connection.on("lobby_settings", lobbieEvents.onLobbySettings);
        this.connection.on("new_math_expression", lobbieEvents.onExpression);
        this.connection.on("player_data", lobbieEvents.onPlayerChange);
        this.connection.on("game_finished", lobbieEvents.onGameFinished);
    }

    leftLobby(){
        this.connection.offAny();
        this.disconnect();
    }

    disconnect(){
        this.connection.disconnect();
    }
}

export default new gameSocket();
