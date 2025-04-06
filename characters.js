k.makeCharacter = (data)=>{
    let character = add([
        pos(data.x,data.y),
        scale(4),
        area({shape:new Reflect(vec2(0),16,42)}),
        body({stickToPlatform: true}),
        origin('center'),
        'character',
        data.playername,
        {
            ...data,
            sprites:{
                "idle"              :   data.spritename_idle,
                "run"               :   data.spritename_run,
                "walk"              :   data.spritename_walk,
                "jump"              :   data.spritename_jump,
                "hurt"              :   data.spritename_hurt,
                "shield"            :   data.spritename_shield,
                "attack_1"          :   data.spritename_attack_1,
                "attack_2"          :   data.spritename_attack_2,
                "attack_3"          :   data.spritename_attack_3,
            },
            isJumping : false,
            speed:data.speed ?? 15,
            jumpForce:data.jumpForce ?? 20
        }
    ])
    character.add(
        {
            Idle : ()=>{
                character.useSprite(character.sprites.idle)
                character.play("idle")
            },
            Run : ()=>{
                if(!character.isJumping){
                    character.useSprite(character.sprites.run)
                    character.play("run")
                }
            },
            Walk : ()=>{
                character.useSprite(character.sprites.walk)
                character.play("walk")
            },
            Jump : ()=>{
                character.useSprite(character.sprites.jump)
                character.play("jump")
                character.isJumping = true
                character.jump(character.jumpForce)
            },
            Hurt : ()=>{
                character.useSprite(character.sprites.hurt)
                character.play("hurt")
            },
            Shield : ()=>{
                character.useSprite(character.sprites.shield)
                character.play("shield")
            },
            getBackToIdle : ()=>{
                if(this.isGrounded){
                    character.isJumping = false
                }
                character.Idle
            },
            Moveleft : () => {
                character.move(character.speed*-1,0)
            },
            Moveright : () => {
                character.move(character.speed*1,0)
            },
            Moveup : () => {
                character.Jump()
            },
        }
    )
    return character
}