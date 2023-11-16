class Cell {
    #gridX = 0;
    #gridY = 0;
    #alive = false;
    #nextAlive = false;
    constructor(gridX, gridY, alive) {
        this.#gridX = gridX;
        this.#gridY = gridY;
        this.#alive = alive;
    }
    born() {
        this.#alive = true;
    }
    die() {
       this.#alive = false; 
    }
    isAlive() {
        return this.#alive;
    }
    isNextAlive() {
        return this.#nextAlive;
    }
    nextAlive() {
        this.#nextAlive = true;
    }
    nextDead() {
        this.#nextAlive = false;
    }
    coord() {
        return {x:this.#gridX,y:this.#gridY};
    }
}