import {io} from "socket.io-client";

class gameSocket {
    constructor() {
        this.connection = io("/", {autoConnect: false});

        this.connection.on("connect", (socket) => {
            console.log(this.connection);
        });

        this.connection.on("disconnect", () => {
            console.log(this.connection);
        });
    }

    findGame(preset_id, onFound, beforeFound) {
        beforeFound.call();
        this.connection = this.connection.connect();
        this.connection.emit("find_game", preset_id);
        this.connection.on("game_found", onFound);
    }

    disconnect(){
        this.connection.disconnect();
    }
}

export default new gameSocket();
