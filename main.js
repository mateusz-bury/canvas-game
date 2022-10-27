const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);




const gravity = 0.7
const player = new fi (
    {
    position:{
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0   
    },
    offset: {
        x: 0,
        y: 0 
    }
    }
);

const enemy = new fi ({
    position:{
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0    
    },
    color: 'blue',
    offset: {
        x: -50,
        y: 0 
    }
});

const keys = {

    a:{
        pressed:false
    },
    d:{
        pressed:false
    },
    w:{
        pressed:false
    },
    ArrowLeft:{
        pressed:false
    },
    ArrowRight:{
        pressed:false
    },
    ArrowUp:{
        pressed:false
    }
};

function kolizjaKwadratow({kwadrat1, kwadrat2}){
    return(
        kwadrat1.hitBox.position.x + kwadrat1.hitBox.width >= kwadrat2.position.x && 
        kwadrat1.hitBox.position.x <= kwadrat2.position.x + kwadrat2.width && 
        kwadrat1.hitBox.position.y + kwadrat1.hitBox.height >= kwadrat2.position.y &&
        kwadrat1.hitBox.position.y <= kwadrat2.position.y + kwadrat2.height
    )};

function determineWinner({player, enemy,timerId}){
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
    if (player.health === enemy.health)
    {
        document.querySelector('#displayText').innerHTML = 'REMIS!'
    }   
    else if (player.health > enemy.health){
        document.querySelector('#displayText').innerHTML = 'MATI WINS!'
    }   
    else if (player.health < enemy.health){
        document.querySelector('#displayText').innerHTML = 'BAMBUS WINS!'
    }};

let timer = 16
let timerId

function decreaseTimer(){ 
   if (timer >0)
   {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }
    if (timer === 0)
    {
        determineWinner({player,enemy, timerId})
    }
};

decreaseTimer();

function animation(){
    window.requestAnimationFrame(animation)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    // player movment
    if(keys.a.pressed && player.lastKey === 'a')
    {
        player.velocity.x = -5
    }
    else if (keys.d.pressed && player.lastKey === 'd')
    {
        player.velocity.x = 5
    }
    // enemy movement
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft')
    {
        enemy.velocity.x = -5
    }
    else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight')
    {
        enemy.velocity.x = 5
    }
    // detect for colision
    if (
        kolizjaKwadratow({
        kwadrat1: player,
        kwadrat2: enemy
    })  && 
        player.isAttacking
    )
    {
        player.isAttacking = false
        enemy.health -= 20
        document.querySelector('#enemyHealth').style.width = enemy.health+'%'
        console.log('player attack!');
    }

    if (
        kolizjaKwadratow({
        kwadrat1: enemy,
        kwadrat2: player
    })  && 
        enemy.isAttacking
    )
    {
        enemy.isAttacking = false
        player.health -= 20
        document.querySelector('#playerHealth').style.width = player.health+'%'
        console.log('enemy attack!');
    }

    // end game based on health
    if (enemy.health <= 0 || player.health <=0)
    {
        determineWinner({player,enemy,timerId})
    }
};

animation();

window.addEventListener('keydown',(event)=>{
  
    switch(event.key){
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -20
            break
        case ' ':
            player.attack()
        break
        // enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -20
            break
        case 'ArrowDown':
            enemy.attack()
        break
    }
});

window.addEventListener('keyup',(event)=>{
    switch(event.key){
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            break
    }
    // enemy keys
    switch(event.key){
        
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
    }
});