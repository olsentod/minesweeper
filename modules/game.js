export class Game {
    constructor() {
        this.score = 10;
        this.time = '2:00';
        this.init();
    }

    init() {
        this.update();
    }

    update() {
        this.updateTime();
        this.updateScore();
    }

    draw() {

    }

    updateTime() {
        document.getElementById('time').innerHTML = this.time;
    }

    updateScore() {
        document.getElementById('mine-count').innerHTML = this.score;
    }
}