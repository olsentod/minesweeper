import { Map } from "./map.js";

export class Game {
    constructor() {
        this.startTime = new Date();
        this.endTime = new Date();
        this.timer = null;
        this.instance = this;
    }

    static getInstance() {
        if (this.instance == null) this.instance = new Game();
        return this.instance;
    }

    static setScore(score) {
        document.getElementById('mine-count').innerHTML = score;
    }

    static setTime(time) {
        document.getElementById('time').innerHTML = Game.convertTime(time);
    }

    static updateTime() {
        Game.setTime(new Date() - Game.getInstance().startTime);
    }

    static init(mineCount, mapWidth, mapHeight){
        const game = Game.getInstance();
        game.mineCount = mineCount;
        game.mapWidth = mapWidth;
        game.mapHeight = mapHeight;
    }

    static setup() {
        const game = Game.getInstance();
        document.getElementById('time').innerHTML = Game.convertTime(0);
        document.getElementById('mine-count').innerHTML = game.mineCount;

        // Clone canvas to remove any previous logic.
        const oldCanvas = document.getElementById("canvas");
        const newCanvas = oldCanvas.cloneNode(true);
        oldCanvas.parentNode.replaceChild(newCanvas, oldCanvas);
        new Map(game.mineCount, game.mapWidth, game.mapHeight);
    }

    static start() {
        Game.getInstance().startTime = new Date();
        Game.getInstance().timer = setInterval(Game.updateTime, 13);
    }

    static finalTime() {
        clearInterval(Game.getInstance().timer);
        Game.getInstance().endTime = new Date();
        Game.setTime(Game.getInstance().endTime - Game.getInstance().startTime);
    }

    static win() {
        Game.finalTime();
        Game.showDialog('You Win! ☺');
        Game.getInstance().instance = null;
    }

    static explode() {
        Game.finalTime();
        Game.showDialog('You Lose! ☹');
        Game.getInstance().instance = null;
    }

    static showDialog(msg) {
        const dialog = document.getElementById('dialog');
        dialog.classList.add('active');
        dialog.querySelector('h1').innerHTML = msg;
    }

    static convertTime(time) {
        const ms = time % 1000;
        time = (time - ms) / 1000;
        const secs = time % 60;
        time = (time - secs) / 60;
        const mins = time % 60;
        const hrs = (time - mins) / 60;

        return String(hrs).padStart(2, "0") +
            ':' + String(mins).padStart(2, "0") +
            ':' + String(secs).padStart(2, "0") +
            '.' + String(ms).padStart(3, "0");
    }
}