import { Field } from "./field.js";

export class Map {
    constructor(width, height) {
        this.map = []; // first array is x, second is y
        this.width = width;
        this.height = height;
        this.mineCount = 50;
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        // this.ctx.drawField = this.drawField.bind(this);
        this.firstClick = null;

        this.init();
        this.draw();
    }

    init() {
        // Initialize Map
        for (let x = 0; x < this.width; x++) {
            const column = [];
            for (let y = 0; y < this.height; y++) {
                const field = new Field(x, y);
                column.push(field);
            }
            this.map.push(column);
        }

        // Setup Canvas
        this.canvas.width = `${Field.WIDTH * this.width}`;
        this.canvas.height = `${Field.HEIGHT * this.height}`;
        this.canvas.addEventListener('click', (e) => { this.handleClick(e, 0) });
        this.canvas.addEventListener('contextmenu', (e) => { this.handleClick(e, 1); });
    }

    generate() {
        while (this.mineCount > 0) {
            const randX = Math.floor(Math.random() * this.width);
            const randY = Math.floor(Math.random() * this.height);
            if (this.map[this.firstClick.x][this.firstClick.y].safePos(randX, randY) && !this.map[randX][randY].isMine) {
                this.map[randX][randY].isMine = true;
                this.map[randX][randY].count = 0;
                this.setAdjacent(randX, randY);
                this.mineCount--;
            }

        }
    }

    setAdjacent(x, y) {
        for (let adjX = x - 1; adjX <= x + 1; adjX++) {
            for (let adjY = y - 1; adjY <= y + 1; adjY++) {
                if(adjX == x && adjY == y) continue;
                if(adjX < 0 || adjY < 0 || adjX >= this.width || adjY >= this.height) continue;
                if(this.map[adjX][adjY].isMine) continue;
                this.map[adjX][adjY].count++;
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const column of this.map) {
            for (const field of column) {
                field.draw(this.ctx);
            }
        }
    }

    handleClick(e, mouse) {
        e.preventDefault();
        const x = Math.floor(e.offsetX / Field.WIDTH);
        const y = Math.floor(e.offsetY / Field.HEIGHT);
        const clickedField = this.map[x][y];

        console.log(clickedField);

        // Left Click
        if (mouse == 0) {
            if (!this.firstClick) {
                this.firstClick = clickedField;
                this.generate();
            }

            clickedField.click(()=> {alert('boom')});
        }
        if (mouse == 1)
            clickedField.toggle();
            // clickedField.state = 'flagged';
        // clickedField.draw(this.ctx);
        this.draw();
    }
}