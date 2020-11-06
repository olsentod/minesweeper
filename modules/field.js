export class Field {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.state = 'hidden' // flagged, hidden, shown
        this.count = 0;
        this.isMine = false;
    }

    getPos() {
        return {
            x: this.x * Field.WIDTH,
            y: this.y * Field.HEIGHT
        }
    }

    draw(ctx) {
        const { x, y } = this.getPos();
        ctx.fillStyle = this.getStroke();
        ctx.rect(x, y, Field.WIDTH, Field.HEIGHT);
    }

    getStroke() {
        switch (this.state) {
            case 'hidden':
                return 'rgba(0,0,0,1)'
            case 'flagged':
                return 'rgba(255,0,0,1)'
            case 'shown':
                return 'rgba(255,255,255,1)'
            default:
                return 'rgba(0,0,200,0)'
        }
    }

    static get WIDTH() {
        return 30;
    }

    static get HEIGHT() {
        return 30;
    }
}