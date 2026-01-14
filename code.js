let rows = 15;
let cols = 15;
let gameInterval = null;

document.addEventListener('DOMContentLoaded', () => {
    createTable();
    document.getElementById("start").onclick = startGame;
    document.getElementById("stop").onclick = stopGame;
    document.getElementById("clear").onclick = clearGrid;
    document.getElementById("random").onclick = randomizeGrid;

});

function createTable() {
    let gridContainer = document.getElementById("gridContainer");
    if (!gridContainer) {
        // throw error
        console.error("Problem: no div for the grid table!");
    }
    let table = document.createElement("table");

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement("td");
            cell.setAttribute("id", i + "_" + j);
            cell.setAttribute("class", "dead");
            tr.appendChild(cell);
            cell.onclick = cellClick;
        }
        table.appendChild(tr);
    }
    gridContainer.appendChild(table);
}
function cellClick() {
    if (this.className === "dead") { // kdyz tato bunka je mrtva 
        this.className = "live";     // tak se ozivi
    } else {
        this.className = "dead";
    }
}
function countLiveNeighbors(row, col) {
    let count = 0;

    for (let i = -1; i <= 1; i++) {     // postupne zkontroluje vsech 8 sousedu. i je radek, j je sloupec
        for (let j = -1; j <= 1; j++) {

            if (i === 0 && j === 0) continue;  // bunka u ktere hlidame sousedy je 0,0 takze se preskoci

            let r = row + i;  // zjisti presny radek souseda
            let c = col + j;  // zjisti presny sloupec souseda

            if (r >= 0 && r < rows && c >= 0 && c < cols) { // zkontroluje jestli soused neni mimo grid
                let neighbor = document.getElementById(r + "_" + c);
                if (neighbor.className === "live") {
                    count++;
                }
            }
        }
    }

    return count;
}

function computeNextGeneration() {
    let next = []; // grid pro dalsi generaci

    for (let row = 0; row < rows; row++) { // projede vsechny rady v gridu
        next[row] = []; // prida radek do gridu dalsi generace
        for (let col = 0; col < cols; col++) { //projede kazdy sloupec v radku

            let cell = document.getElementById(row + "_" + col); // zjisti bunku na teto pozici
            let neighbors = countLiveNeighbors(row, col);  // spocita sousedy teto bunky (predame argumenty radek a sloupec)

            if (cell.className === "live") { //rozhodne jestli bude bunka zit, zemre, zustane mrva nebo ozije
                if (neighbors === 2 || neighbors === 3) { //rozhodne jestli bude bunka zit, zemre, zustane mrva nebo ozije
                    next[row][col] = "live"; //rozhodne jestli bude bunka zit, zemre, zustane mrva nebo ozije
                } else {
                    next[row][col] = "dead"; //rozhodne jestli bude bunka zit, zemre, zustane mrva nebo ozije
                }
            } else {
                if (neighbors === 3) { //rozhodne jestli bude bunka zit, zemre, zustane mrva nebo ozije
                    next[row][col] = "live"; //rozhodne jestli bude bunka zit, zemre, zustane mrva nebo ozije
                } else {
                    next[row][col] = "dead"; //rozhodne jestli bude bunka zit, zemre, zustane mrva nebo ozije
                }
            }
        }
    }


    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            document.getElementById(row + "_" + col).className = next[row][col]; // aplikuje zmeny
        }
    }
}
function startGame() {
    if (!gameInterval) { // kdyz promenna nema zadnou hodnotu tak se ji prida hodnota
        gameInterval = setInterval(computeNextGeneration, 500); // nastavi interval 500ms pro funkci ktera vypocita generaci
    }
}

function stopGame() {
    clearInterval(gameInterval); // zrusi interval
    gameInterval = null; // nastavi promennou na null
}

function clearGrid() {
    stopGame(); // zastavi hru
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            document.getElementById(row + "_" + col).className = "dead"; // postupne projede cely grid a da kazde bunce tridu dead
        }
    }
}

function randomizeGrid() {
    stopGame(); // zastavi hru
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let cell = document.getElementById(row + "_" + col);
            if (Math.random() < 0.5) { // 50% sance ze bunka bude zit nebo zustane mrtva
                cell.className = "live";
            } else {
                cell.className = "dead"; //v podstate stejne jako clear grid akorat je tam pridana sance a ulozeni kazde bunky do promenne
            }
        }
    }
}