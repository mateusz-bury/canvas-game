class Sprite{
    constructor({position,imageSrc, scale = 1,frameMax = 1}){
        this.position = position
        this.width = 50
        this.health = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.frameMax = frameMax
    }
    draw(){
        c.drawImage(
            this.image,
            this.frameCurrent * (this.image.width / this.frameMax),
            0,
            this.image.width / this.frameMax,
            this.image.height,            
            this.position.x, 
            this.position.y, 
            (this.image.width / this.frameMax) * this.scale,
            this.image.height * this.scale
            )
    }
    update(){
        this.draw()
        this.framesElapsed++

        if (this.framesElapsed % this.frameHold === 0){

        if (this.frameCurrent < this.frameMax - 1)
        {
        this.frameCurrent++
        }else{
            this.frameCurrent = 0
        }}
    }
};

class Fighter extends Sprite{
        constructor({
                position,
                velocity, 
                color = 'red', 
                offset, 
                imageSrc,
                scale = 1,
                frameMax = 1
            }){
            super({
                position,
                imageSrc,
                scale,
                frameMax,
            })
         
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
            this.health = 100
            this.frameCurrent = 0
            this.framesElapsed = 0
            this.frameHold = 10
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
    
        update(){
            this.draw()
            this.hitBox.position.x = this.position.x + this.hitBox.offset.x
            this.hitBox.position.y = this.position.y
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
            if (this.position.y + this.height + this.velocity.y >= canvas.height -91){
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