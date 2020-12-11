import { Game } from "./modules/game.js";

document.getElementById('start-button').addEventListener('click', ()=> {

    const mineCount = Number(document.getElementById('mine-count-input').value);
    const mapWidth = Number(document.getElementById('map-width-input').value);
    const mapHeight = Number(document.getElementById('map-height-input').value);

    if(isNaN(mineCount) || isNaN(mapWidth) || isNaN(mapHeight)){
        alert('Not valid input types. Please give a number');
        return;
    }

    if(mapWidth > 20 || mapHeight > 20){
        alert(`The game doesn't work well with widths/heights over 20`);
        return;
    }

    Game.init(mineCount, mapWidth, mapHeight);
    Game.setup();
    document.querySelector('.game').classList.add('active');
    document.querySelector('.start-screen').classList.remove('active');
});

document.getElementById('restart-button').addEventListener('click', () => {
    document.getElementById('dialog').classList.remove('active');
    document.querySelector('.game').classList.remove('active');
    document.querySelector('.start-screen').classList.add('active');
})