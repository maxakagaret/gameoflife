var table = document.getElementById('lifeGrid'),
    form = document.getElementById('controlPanelForm'),
    runBtn = document.getElementById('playGame'),
    resetBtn = document.getElementById('resetGame'),
    gameField = document.getElementById('gameField'),
    lifeGrid;
form.addEventListener('submit',(e) => {
    e.preventDefault();
    let inputWidth = document.getElementById('inputWidth'),
        width = parseInt(inputWidth.value)>0?inputWidth.value:100,
        recalcWidth = gameField.offsetWidth / width,
        inputHeight = document.getElementById('inputWidth'),
        height = parseInt(inputHeight.value)>0?inputHeight.value:100,
        inputSpeed = document.getElementById('inputSpeed'),
        speed = (parseInt(inputSpeed.value)>=100 && parseInt(inputSpeed.value)<=5000)?inputSpeed.value:1000;
        inputRandom = document.getElementById('inputRandom'),
        isRandom = inputRandom.checked,
        inputRandomCoefficient = document.getElementById('inputRandomCoefficient'),
        randomCoefficient = (parseInt(inputRandomCoefficient.value)>=0 && parseInt(inputRandomCoefficient.value)<=100)?(inputRandomCoefficient.value/100):0.5;

    if(recalcWidth < 10) {
        gameField.style.width = (width*10)+"px";    
    }
    
    lifeGrid = new GameField(table,width,height,speed,isRandom,randomCoefficient);
    lifeGrid.createGrid();
    runBtn.removeAttribute('disabled');
});
runBtn.addEventListener('click',(e) => {
    e.target.classList.toggle('active');

    if(!e.target.classList.contains('active')){
        lifeGrid.pauseGame();
        e.target.textContent="Play Game";
    }
    else {
        lifeGrid.runGame();
        e.target.textContent="Pause Game";
    }
    
    resetBtn.removeAttribute('disabled');
});
resetBtn.addEventListener('click',(e) => {
    lifeGrid.reset();
    runBtn.classList.remove('active');
    runBtn.textContent="Play Game";
    runBtn.setAttribute('disabled','disabled');
    resetBtn.setAttribute('disabled','disabled');
});