const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7

const background = new Sprite ({
    position:{
        x: 0,
        y:0
    },
    imageSrc: '/img/background.png'
});

const shop = new Sprite ({
    position:{
        x: 610,
        y: 135
    },
    imageSrc: '/img/shop.png',
    scale: 2.75,
    frameMax: 6
});

const player = new Fighter (
    {
    position:
    {
        x: 0,
        y: 0
    },
    velocity: 
    {
        x: 0,
        y: 0   
    },
    offset: 
    {
        x: 0,
        y: 0 
    },
    imageSrc: '/img/samuraiMack/Idle.png',
    frameMax: 8,
    scale: 2.5,
    offset: 
    {
        x:170,
        y:155
    },
    sprites:
    {
        idle:
            {
            imageSrc:'/img/samuraiMack/Idle.png',
            frameMax: 8
            },
        run:
            {
            imageSrc:'/img/samuraiMack/Run.png',
            frameMax: 8,
            },
        jump:
            {
            imageSrc:'/img/samuraiMack/Jump.png',
            frameMax: 2,
            },
        fall:
            {
            imageSrc:'/img/samuraiMack/Fall.png',
            frameMax: 2,
            }
            }
    });

const enemy = new Fighter ({
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

decreaseTimer();

function animation(){
    window.requestAnimationFrame(animation)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    player.update()

    // enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    // player movment
    
    if(keys.a.pressed && player.lastKey === 'a')
    {
        player.velocity.x = -5
        player.switchSprite('run')
    }
    else if (keys.d.pressed && player.lastKey === 'd')
    {
        player.velocity.x = 5
        player.switchSprite('run')
    } else {
        player.switchSprite('idle')
    }

    if (player.velocity.y < 0){
       player.switchSprite('jump')
    }
    else if (player.velocity.y > 0){
        player.switchSprite('fall')
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
        enemy.health -= 5
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
        player.health -= 5
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