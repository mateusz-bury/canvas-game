class Sprite{
    constructor
    ({
        position,
        imageSrc, 
        scale = 1,
        frameMax = 1, 
        offset = {x:0, y:0}
    }){
        this.position = position
        this.width = 50
        this.health = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.frameMax = frameMax
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.frameHold = 10
        this.offset = offset

    }
    draw(){
        c.drawImage(
            this.image,
            this.frameCurrent * (this.image.width / this.frameMax),
            0,
            this.image.width / this.frameMax,
            this.image.height,            
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.image.width / this.frameMax) * this.scale,
            this.image.height * this.scale
            )
    }

animateFrames(){
    this.framesElapsed++

        if (this.framesElapsed % this.frameHold === 0){

        if (this.frameCurrent < this.frameMax - 1)
        {
        this.frameCurrent++
        }else{
            this.frameCurrent = 0
            }
        }
}


    update(){
        this.draw()
        this.animateFrames()
}}

class Fighter extends Sprite{
        constructor
            ({
                position, 
                velocity, 
                color = 'red',
                imageSrc, 
                scale = 1,
                frameMax = 1,
                offset = {x : 0, y : 0},
                sprites
            }){
                super
                ({
                    position,
                    imageSrc,
                    scale,
                    frameMax,
                    offset
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
            this.sprites = sprites

            for (const sprite in sprites){
                sprites[sprite].image = new Image()
                sprites[sprite].image.src = sprites[sprite].imageSrc

            }
        }
    
        update(){
            this.draw()
            this.animateFrames()
            
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
        }
        switchSprite(sprite){
            switch(sprite){
                case 'idle':
                    if(this.image !== this.sprites.idle.image)
                    {
                        this.image = this.sprites.idle.image
                        this.frameMax = this.sprites.idle.frameMax
                        this.frameCurrent = 0
                    }
                    break
                case 'run':
                    if(this.image !== this.sprites.run.image)
                    {
                        this.image = this.sprites.run.image
                        this.frameMax = this.sprites.run.frameMax
                        this.frameCurrent = 0
                    }
                    break
                case 'jump':
                    if(this.image !== this.sprites.jump.image)
                    {
                        this.image = this.sprites.jump.image
                        this.frameMax = this.sprites.jump.frameMax
                        this.frameCurrent = 0
                    }
                    break
            }
        }
    };