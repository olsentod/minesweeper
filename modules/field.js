export class Field {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.state = 'hidden' // flagged, hidden, shown
        this.count = 0;
        this.isMine = false;
        this.isHovering = false;
        this.color = 'white'
        this.visited = false;
    }

    getPos() {
        return {
            x: this.x * Field.WIDTH,
            y: this.y * Field.HEIGHT
        }
    }

    safePos(x, y) {
        const protectedX = { left: this.x - 1, right: this.x + 1 };
        const protectedY = { top: this.y - 1, bottom: this.y + 1 };
        return !((protectedX.left <= x && protectedX.right >= x) && (protectedY.top <= y && protectedY.bottom >= y));
    }

    click(callback) {
        this.state = 'shown';
        if (this.isMine) callback();
    }

    toggle() {
        switch (this.state) {
            case 'hidden':
                this.state = 'flagged';
                break;
            case 'flagged':
                this.state = 'question';
                break;
            case 'question':
                this.state = 'hidden';
                break;
            case 'shown':
            default:
                break;
        }
    }

    draw(ctx) {
        let { x, y } = this.getPos();
        const offset = 5;
        const r = Field.WIDTH / 2 - offset;
        const textSize = 18;
        const textX = x + (Field.WIDTH / 2) - offset * 2;
        const textY = y + (Field.WIDTH / 2) + 1;
        let color = this.getFill();
        // if (this.isMine) color = 'black'

        ctx.beginPath();
        x = parseInt(x) + r;
        y = parseInt(y) + r;
        ctx.arc(x, y, r, 0, Math.PI * 2, true);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.fillStyle = '#011526';
        ctx.font = `bold ${textSize}px "Open Sans", sans-serif`;
        if(this.count > 0 && this.state == 'shown')
            ctx.fillText(this.count, textX, textY);
        // ctx.lineWidth = 10;
        // ctx.strokeStyle = 'black';
        // ctx.stroke();
    }

    getFill() {
        if(this.isHovering) return '#FFF000' 
        switch (this.state) {
            case 'hidden':
                return '#A4B5BF'
            case 'flagged':
                return '#D97E4A'
            case 'shown':
                return '#5e666b'
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