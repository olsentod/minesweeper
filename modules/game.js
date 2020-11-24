export class Game {
    constructor() {
        this.score = 10;
        this.startTime = new Date();
        this.endTime = new Date();
        this.timer = null;
        this.instance = this;
    }

    static getInstance() {
        if (this.instance == null) this.instance = new Game();
        return this.instance;
    }

    start(){
        this.startTime = new Date();
        Game.getInstance().timer = setInterval(this.updateTime, 100);
        // this.updateTime();
    }

    update() {
        this.updateTime();
        this.updateScore();
    }

    draw() {

    }

    updateTime() {
        const time = new Date() - Game.getInstance().startTime;
        console.log('inside', time);
        document.getElementById('time').innerHTML = time;
    }

    explode(){
        clearInterval(Game.getInstance().timer);
        Game.getInstance().endTime = new Date();
        const time = Game.getInstance().endTime - Game.getInstance().startTime;
        document.getElementById('time').innerHTML = time;
    }

    updateScore() {
        document.getElementById('mine-count').innerHTML = this.score;
    }
}