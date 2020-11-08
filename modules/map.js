import { Field } from "./field.js";

export class Map {
    constructor(width, height) {
        this.map = []; // first array is x, second is y
        this.width = width;
        this.height = height;
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.strokeStyle = 'green';
        this.ctx.drawField = this.drawField.bind(this);

        this.init();
        this.draw();
    }

    init() {
        // Initialize Map
        for (let x = 0; x < this.width; x++) {
            const column = [];
            for (let y = 0; y < this.height; y++) {
                column.push(new Field(x, y));
            }
            this.map.push(column);
        }

        // Setup Canvas
        this.canvas.width = `${Field.WIDTH * this.width + 1}`;
        this.canvas.height = `${Field.HEIGHT * this.height + 1}`;
        this.canvas.addEventListener('click', (e) => { this.handleClick(e, 0) });
        this.canvas.addEventListener('contextmenu', (e) => { this.handleClick(e, 1); });
    }

    generate() {

    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const column of this.map) {
            for (const field of column) {
                field.draw(this.ctx);
            }
        }
    }

    drawField(x, y, r, fill) {
        this.ctx.beginPath();
        x = parseInt(x) + r;
        y = parseInt(y) + r;
        this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
        this.ctx.fillStyle = fill;
        this.ctx.fill();
        this.ctx.lineWidth = 10;
        this.ctx.strokeStyle = 'white';
        this.ctx.stroke();
    }

    handleClick(e, mouse) {
        e.preventDefault();
        const x = Math.floor(e.offsetX / Field.WIDTH);
        const y = Math.floor(e.offsetY / Field.HEIGHT);
        const clickedField = this.map[x][y];
        if (mouse == 0) // Left Click
            clickedField.state = 'shown';
        if (mouse == 1 && clickedField.state != 'shown')
            clickedField.state = 'flagged';
        // clickedField.draw(this.ctx);
        this.draw();
    }
}