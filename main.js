const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7

class Sprite {
    constructor({position, velocity, color = 'red', offset}){
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.hitBox = {
            position: {
                x: this.position.x, 
                y: this.position.y,  
            },
            offset,
            width: 100,
            height: 50,
        }
        this.color = color
        this.isAttacking
    }


    draw (){
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        // hit box
        if (this.isAttacking){
        c.fillStyle = 'green'
        c.fillRect(
            this.hitBox.position.x,
            this.hitBox.position.y, 
            this.hitBox.width,
            this.hitBox.height
            )
        }
    };

    update() {
        this.draw()
        this.hitBox.position.x = this.position.x + this.hitBox.offset.x
        this.hitBox.position.y = this.position.y
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        } else 
            this.velocity.y += gravity
    };

    attack(){
        this.isAttacking = true
        setTimeout(()=>{
            this.isAttacking = false
        }, 100)
    };
};

const player = new Sprite({
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
});

const enemy = new Sprite({
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

function animation(){
    window.requestAnimationFrame(animation)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    // player movment
    if(keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -5
    }
    else if (keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 5
    }
    // enemy movement
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -5
    }
    else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 5
    }
    // detect for colision
    if (
        kolizjaKwadratow({
        kwadrat1: player,
        kwadrat2: enemy
    }) && 
        player.isAttacking
    ){
        player.isAttacking = false
        console.log('player attack!');
    }

    if (
        kolizjaKwadratow({
        kwadrat1: enemy,
        kwadrat2: player
    }) && 
        enemy.isAttacking
    ){
        enemy.isAttacking = false
        console.log('enemy attack!');
    }
};

animation()

window.addEventListener('keydown',(event)=>{
    console.log(event.key);
    
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