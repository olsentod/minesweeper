import {
    MINE_COUNT
} from './constants.js'

export class Game {
    constructor() {
        this.startTime = new Date();
        this.endTime = new Date();
        this.timer = null;
        this.instance = this;
        this.init();
    }

    init() {
        document.getElementById('time').innerHTML = Game.convertTime(0);
        document.getElementById('mine-count').innerHTML = MINE_COUNT;
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

    static start() {
        Game.getInstance().startTime = new Date();
        Game.getInstance().timer = setInterval(Game.updateTime, 13);
    }

    static explode() {
        clearInterval(Game.getInstance().timer);
        Game.getInstance().endTime = new Date();
        Game.setTime(Game.getInstance().endTime - Game.getInstance().startTime);
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