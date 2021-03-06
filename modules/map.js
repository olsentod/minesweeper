import { Field } from "./field.js";
import { Game } from "./game.js";

export class Map {
    constructor(mineCount, width, height) {
        this.map = []; // first array is x, second is y
        this.width = width;
        this.height = height;
        this.mineCount = mineCount;
        this.score = mineCount;
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.firstClick = null;
        this.hover = null;

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
        this.canvas.addEventListener('click', (e) => {
            this.handleClick(e, 0)
        });
        this.canvas.addEventListener('contextmenu', (e) => {
            this.handleClick(e, 1);
        });
        this.canvas.addEventListener('mousemove', (e) => {
            this.handleHover(e)
        });
        this.canvas.addEventListener('mouseleave', (e) => {
            this.hover.isHovering = false;
            this.draw()
        });
    }

    /**
     * Places the mines on the map. It has a procted zone around the inital click so you have something to work with.
     */
    generate() {
        let count = this.mineCount;
        while (count > 0) {
            const randX = Math.floor(Math.random() * this.width);
            const randY = Math.floor(Math.random() * this.height);
            if (this.map[this.firstClick.x][this.firstClick.y].safePos(randX, randY) && !this.map[randX][randY].isMine) {
                this.map[randX][randY].isMine = true;
                this.map[randX][randY].count = 0;
                this.setAdjacent(randX, randY);
                count--;
            }
        }

        this.uncoverSafeFields(this.firstClick.x, this.firstClick.y);
    }

    /**
     * Recursive function to uncover fields that don't have numbers and expand the map more.
     * @param {Number} origX Original x position
     * @param {Number} origY Original y position
     */
    uncoverSafeFields(origX, origY) {
        for (let x = origX - 1; x <= origX + 1; x++) {
            for (let y = origY - 1; y <= origY + 1; y++) {
                if (this.outOfBounds(x, y)) continue; // Out of Bounds
                if (this.map[x][y].visited) continue; // Already visited
                if (this.map[x][y].isMine) continue; // Is a mine
                this.map[x][y].state = 'shown';
                this.map[x][y].visited = true;
                if (this.map[x][y].count > 0) continue; // Recurse if doesn't have a number.
                this.uncoverSafeFields(x, y, 1);
            }
        }
    }

    getField(x, y) {
        return this.map[x][y];
    }

    screenToMapCoords(x, y) {
        return {
            x: Math.floor(x / Field.WIDTH),
            y: Math.floor(y / Field.HEIGHT)
        }
    }

    /**
     * Sets the adjacent fields to more number that are touching a mine. Doesn't add to mines or out of bounds
     * @param {Number} x Position X
     * @param {Number} y Position Y
     */
    setAdjacent(x, y) {
        for (let adjX = x - 1; adjX <= x + 1; adjX++) {
            for (let adjY = y - 1; adjY <= y + 1; adjY++) {
                if (adjX == x && adjY == y) continue; // Can't set itself
                if (this.outOfBounds(adjX, adjY)) continue; // Out of Bounds
                if (this.map[adjX][adjY].isMine) continue; // is a mine
                this.map[adjX][adjY].count++;
            }
        }
    }

    outOfBounds(x, y) {
        return x < 0 || y < 0 || x >= this.width || y >= this.height; // Out of Bounds
    }

    checkForWin() {
        let count = 0;
        for (const column of this.map) {
            for (const field of column) {
                if (field.state === 'flagged' && field.isMine) count++;
            }
        }
        return count == this.mineCount;
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
        const { x, y } = this.screenToMapCoords(e.offsetX, e.offsetY);
        const clickedField = this.getField(x, y);

        if (!this.firstClick) {
            this.firstClick = clickedField;
            Game.start();
            this.generate();
            return;
        }

        // Left Click
        if (mouse == 0) {
            if (clickedField.count == 0 && !clickedField.isMine)
                this.uncoverSafeFields(clickedField.x, clickedField.y);

            // Defaults to a mine
            clickedField.click();
        }
        if (mouse == 1) {
            this.score += clickedField.toggle();
            Game.setScore(this.score);
        }

        if (this.score === 0) {
            if (this.checkForWin()) {
                Game.win();
            }
        }

        this.draw();
    }

    handleHover(e) {
        e.preventDefault();
        const { x, y } = this.screenToMapCoords(e.offsetX, e.offsetY);

        if (this.outOfBounds(x, y)) return;
        if (!this.hover) this.hover = this.map[x][y]; // Setup first hover
        if (x != this.hover.x || y != this.hover.y) {
            this.hover.isHovering = false;
        }
        this.hover = this.getField(x, y);
        this.hover.isHovering = true;
        this.draw();
    }
}