class GameField {
    #table;
    #columns;
    #rows;
    #speed;
    #random;
    #randomCoeff;
    #cells;
    #isGameRunning;
    #isCellsInit;
    constructor(table,columns=100, rows=100, speed=1000, random=false, randomCoeff=0.5) {
        this.#table = table;
        this.#columns = columns;
        this.#rows = rows;
        this.#speed = speed;
        this.#random = random;
        this.#randomCoeff = randomCoeff;
        this.#cells = [];
        this.#isGameRunning = false;
        this.#isCellsInit = false;
    }
    addCells() {
        for (let y = 0; y < this.#rows; y++) {
            for (let x = 0; x < this.#columns; x++) {
                if(this.#random) {
                    let isAlive = this.#random?Math.random()>this.#randomCoeff:true;
                    this.#cells.push(new Cell(x,y,isAlive));
                    if(isAlive) {
                        this.#table.querySelector('[data-y="'+y+'"][data-x="'+x+'"]').classList.add('active');
                    }
                }
                else {
                    let isAlive = this.#table.querySelector('[data-y="'+y+'"][data-x="'+x+'"]').classList.contains('active');
                    this.#cells.push(new Cell(x,y,isAlive));
                }
            }
        }
    }
    createGrid() {
        var isGameRunning = this.#isGameRunning;
        while (this.#table.firstChild) {
            this.#table.removeChild(this.#table.lastChild);
        }
        for (let y = 0; y < this.#rows; y++) {
            let tableRow = this.#table.insertRow(y);
            for (let x = 0; x < this.#columns; x++) {
                let tableCell = tableRow.insertCell(x);
                tableCell.setAttribute('data-y',y);
                tableCell.setAttribute('data-x',x);
                tableCell.addEventListener('click', function(e) {
                    e.preventDefault();
                    if(!isGameRunning) {
                        e.target.classList.toggle('active');
                    }
                });
            }
        }
    }
    runGame() {
        if(!this.#isCellsInit) {
            this.#isCellsInit = true;
            this.addCells();
        }
        this.#isGameRunning = true;
        window.requestAnimationFrame(() => this.gameLoop());
    }
    pauseGame() {
        this.#isGameRunning = false;
    }
    gameLoop() {
        if(this.#isGameRunning) {
            this.checkSurroundingCells();

            setTimeout( () => {
                window.requestAnimationFrame(() => this.gameLoop());
            }, this.#speed);
        }
    }
    checkSurroundingCells() {
        for (let x = 0; x < this.#columns; x++) {
            for (let y = 0; y < this.#rows; y++) {
                let numAlive = this.isAlive(x-1,y-1)+this.isAlive(x,y-1)+this.isAlive(x+1,y-1)+this.isAlive(x-1,y)+this.isAlive(x+1,y)+this.isAlive(x-1,y+1)+this.isAlive(x,y+1)+this.isAlive(x+1,y+1),
                    centerIndex = this.gridToIndex(x, y);
                
                if(numAlive < 2 || numAlive > 3) {
                    this.#cells[centerIndex].nextDead();
                }
                else if(numAlive == 3) {
                    this.#cells[centerIndex].nextAlive();
                }
            }
        }
        
        for (let i = 0; i < this.#cells.length; i++) {
            this.#cells[i].isNextAlive() ? this.#cells[i].born():this.#cells[i].die();
            let tableCell = this.#table.querySelector('td[data-y="'+this.#cells[i].coord().x+'"][data-x="'+this.#cells[i].coord().y+'"]');
            if(this.#cells[i].isAlive()) {
                tableCell.classList.add('active');
            }
            else {
                tableCell.classList.remove('active');
            }
        }
    }
    isAlive(x,y) {
        let index = this.gridToIndex(x,y);

        return this.#cells[index].isAlive()?1:0; 
    }
    gridToIndex(x, y) {
        const
            xCoord = x<0||x>=this.#columns?Math.abs(this.#columns-Math.abs(x)):x,
            yCoord = y<0||y>=this.#rows?Math.abs(this.#rows-Math.abs(y)):y;

        return xCoord + yCoord*this.#columns;
    }
    reset() {
        this.#isGameRunning = false;
        this.#cells = [];
        this.#isCellsInit = false;
        while (this.#table.firstChild) {
            this.#table.removeChild(this.#table.lastChild);
        }
    }
}