const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;

let snake = [{x: 10 * box, y: 10 * box}];

let food = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box
};

let direction = "RIGHT";

document.addEventListener("keydown", event => {
    if(event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if(event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if(event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    if(event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

function draw(){

    ctx.fillStyle = "black";
    ctx.fillRect(0,0,400,400);

    snake.forEach(part =>{
        ctx.fillStyle = "#22c55e";
        ctx.fillRect(part.x, part.y, box, box);
    });

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let headX = snake[0].x;
    let headY = snake[0].y;

    if(direction === "LEFT") headX -= box;
    if(direction === "UP") headY -= box;
    if(direction === "RIGHT") headX += box;
    if(direction === "DOWN") headY += box;

    if(headX === food.x && headY === food.y){
        food = {
            x: Math.floor(Math.random()*19)*box,
            y: Math.floor(Math.random()*19)*box
        };
    } else {
        snake.pop();
    }

    const newHead = {
        x: headX,
        y: headY
    };

    if(
        headX < 0 ||
        headY < 0 ||
        headX >= 400 ||
        headY >= 400
    ){
        clearInterval(game);
        alert("Game Over");
    }

    snake.unshift(newHead);
}

const game = setInterval(draw, 120);