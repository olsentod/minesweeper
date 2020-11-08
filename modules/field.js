export class Field {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.state = 'hidden' // flagged, hidden, shown
        this.count = 0;
        this.isMine = false;
        this.color = 'white'
    }

    getPos() {
        return {
            x: this.x * Field.WIDTH,
            y: this.y * Field.HEIGHT
        }
    }

    draw(ctx) {
        const { x, y } = this.getPos();
        ctx.drawField(x, y, Field.WIDTH/2, this.getFill());
    }

    getFill() {
        switch (this.state) {
            case 'hidden':
                return 'rgba(40, 40, 40, 1)'
            case 'flagged':
                return 'rgba(255,0,0,1)'
            case 'shown':
                return 'rgba(100, 100, 100, 1)'
            default:
                return 'rgba(0,0,200,1)'
        }
    }

    static get WIDTH() {
        return 40;
    }

    static get HEIGHT() {
        return 40;
    }
}