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

let timer = 60
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
