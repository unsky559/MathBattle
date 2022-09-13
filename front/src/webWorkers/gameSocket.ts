import {io, Socket} from "socket.io-client";

class gameSocket {
    private connection: Socket;
    private connected: boolean;
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
            this.connected = true;
        });

        this.connection.on("disconnect", () => {
            this.connected = false;
        });
    }

    answer(answer: string){
        this.connection.emit("answer", {answer: parseFloat(answer)});
    }

    findGame(preset_id: string, onFound: () => any, beforeFound: () => any) {
        beforeFound();
        this.connection = this.connection.connect();
        this.connection.emit("find_game", preset_id);
        this.connection.on("game_found", onFound);
    }

    stopFindingGame() {
        this.disconnect();
        this.connection.off("game_found");
    }

    joinLobby(lobby_id: string, lobbieEvents: { onLobbySettings: () => void, onGameFinished: () => void, onPlayerChange: () => void, onExpression: () => void }){
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
