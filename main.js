//implementarea algoritmului a* 
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");

function AstarUnit(x, y) {
    this.x = x;
    this.y = y;
    this.h = 0; //destinatia
    this.f = 0;
    this.wall = false;
    if (Math.random() < 0.4) this.wall = true; //crearea peretilor
    this.neighbors = [];
    this.findNeighbors = (grid) => { //algoritmul de cautare a vecinatatilor
        let x = this.x;
        let y = this.y;
        if (x > 0) this.neighbors.push(grid[x - 1][y]);
        if (y > 0) this.neighbors.push(grid[x][y - 1]);
        if (x < col - 1) this.neighbors.push(grid[x + 1][y]);
        if (y < row - 1) this.neighbors.push(grid[x][y + 1]);
        if (x < col - 1 && y > 0) this.neighbors.push(grid[x + 1][y - 1]);
        if (x < col - 1 && y < row - 1) this.neighbors.push(grid[x + 1][y + 1]);
        if (x > 0 && y > 0) this.neighbors.push(grid[x - 1][y - 1]);
        if (x > 0 && y < row - 1) this.neighbors.push(grid[x - 1][y + 1]);
    }
}
let done = false;
let col = 50; //dimensiunea canvasului
let row = 50; //dimensiunea canvasului
let grid = new Array(col);
for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array();
}
for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < row; j++) {
        grid[i].push(new AstarUnit(i, j));
    }
}
for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < row; j++) {
        grid[i][j].findNeighbors(grid);
    }
}

let start = grid[0][0]; //initierea canvasului
start.wall = false;
let end = grid[col - 1][row - 1];
end.wall = false;
let openSet = [start];
let closedSet = [];
let nodePath;
let render = () => {

    ctx.fillStyle = 'white'; //spatiile dintre ziduri
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 1, 1);


    ctx.fillStyle = 'red'; //generarea drumului de cautarea
    closedSet.forEach(cl => {
        ctx.fillRect(cl.x * 10, cl.y * 10, 10, 10);
    })
    ctx.fillStyle = 'blue'; //gasirea drumului optim
    if (nodePath) {
        done = true;

        while (nodePath.parent) {
            ctx.fillRect(nodePath.parent.x * 10, nodePath.parent.y * 10, 10, 10);
            nodePath.parent = nodePath.parent.parent;
        }
    }
    ctx.fillStyle = 'black';
    for (let i = 0; i < grid.length; i++) { // generarea zidurilor
        for (let j = 0; j < row; j++) {
            if (grid[i][j].wall) ctx.fillRect(grid[i][j].x * 10, grid[i][j].y * 10, 10, 10);
        }
    }
};
let update = () => { //functia update care actualizeaza cadrele 
    nodePath = doAstar();

}
let doAstar = () => { //functia care proceseaza algoritmul a*
    if (openSet.length !== 0) {
        let winner = 0;
        openSet.forEach((open, i) => {
            if (open.f < openSet[winner].f) {
                winner = i;
            }
        });
        let current = openSet[winner];
        if (current === end)
            return current;
        openSet = openSet.filter(i => i != current);
        closedSet.push(current);
        for (let i = 0; i < current.neighbors.length; i++) {
            let neighbor = current.neighbors[i];
            if (closedSet.includes(neighbor) || neighbor.wall)
                continue;
            tempG = current.g === undefined ? 0 : current.g + 1;
            if (!openSet.includes(neighbor)) {
                openSet.push(neighbor);
            } else {
                if (tempG >= neighbor.g)
                    continue;
            }
            neighbor.parent = current;
            neighbor.g = tempG;
            neighbor.f = tempG + dist(neighbor.x, neighbor.y, end.x, end.y);

        }
    }



}
let collide = (o1, o2) => {
    if (o1.x + o1.width > o2.x && o1.x < o2.x + o2.width && o1.y + o1.height > o2.y && o1.y < o2.y + o2.height) return true;
    return false;
}
let dist = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
setInterval(() => {
    update();
    if (!done) render();
}, 1000 / 3);

// abonare la newsletter
function newsLetter() {
    document.getElementsByClassName('form-box');
    alert("Abonat cu succes!");

}

//sistemul de ticket
function support() {
    document.getElementsByClassName('supBox');
    let cerere = prompt('Cererea ta aici:');
    let confirmare = confirm('Ticket-ul tau va fi preluat de un specialist. Verifica-ti mail-ul in viitorul apropiat.');
    console.log(cerere, confirmare);
}