k.makePlayer = (data,parent) => {
    const {character,playername} = data
    const spritename = k.CHARACTER_SPRITES[character]
    const player_data = {
        speed:data.speed ?? 460,
        jumpForce:data.jumpForce ?? 800,
        x:data.x,
        y:data.y,
        flipX:data.flipX
    };
    ['idle','run','attack','walk','jump','run','hurt','dead','shield','attack_1','attack_2','attack_3'].forEach(action => {
        player_data['spritename_'+action] = spritename+'_'+action
    })
    return k.makeCharacter({...player_data,playername},parent)
}
k.makeCharacter = (data,parent=null)=>{
    const addfunc = parent ? parent.add : add
    
    let character = add([
        pos(data.x,data.y+40),
        scale(4),
        area({shape:new Rect(vec2(0),40,80)}),
        body({stickToPlatform: true,shape:new Rect(vec2(0),40,80,'center')}),
        anchor('center'),
        data.playername,
        // {health:400},
        {health:200},
    ])
    character.sprites = {
        "idle"              :   data.spritename_idle,
        "run"               :   data.spritename_run,
        "walk"              :   data.spritename_walk,
        "jump"              :   data.spritename_jump,
        "hurt"              :   data.spritename_hurt,
        "dead"              :   data.spritename_dead,
        "shield"            :   data.spritename_shield,
        "attack_1"          :   data.spritename_attack_1,
        "attack_2"          :   data.spritename_attack_2,
        "attack_3"          :   data.spritename_attack_3,
    }
    character.is_jumping = false
    character.isMoving = false
    character.isRunning = false
    character.is_attacking = true
    character.speed=data.speed ?? 460
    character.jumpForce=data.jumpForce ?? 20
    character.dataflipX=data.flipX
    character.flipX=data.flipX
    character.playername = data.playername
    character.strength = data.strength ?? 5
    character.is_dead = false
    
    
    
    character.Idle = ()=>{
        if(!character.is_dead)
        {
            character.flipX = character.dataFlipX
            character.isRunning = false
            character.isMoving = false
            character.is_jumping = false
            character.is_attacking = false
            if(character.attack)
            {
                character.attack.destroy()
            }
            character.use(sprite(character.sprites.idle))
            character.play("idle")
            character.flipX = character.dataFlipX
        }
    }
    character.Run = ()=>{
        if(!character.is_dead)
        {
            if(!character.is_jumping && !character.isRunning){
                character.use(sprite(character.sprites.run))
                character.play("run")
                character.isRunning = true
            }
        }
    }
    character.Walk = ()=>{
        if(!character.is_dead)
        {
            character.use(sprite(character.sprites.walk))
            character.play("walk")
        }
    }
    character.Jump = ()=>{
        if(!character.is_dead)
        {
            if(!character.is_jumping) {
                character.use(sprite(character.sprites.jump))
                character.play("jump")
                character.is_jumping = true
                character.jump(character.jumpForce)
            }
        }
    }
    character.Hurt = ()=>{
        if(!character.is_dead)
        {
            play('ay')
            character.use(sprite(character.sprites.hurt))
            character.play("hurt")
            character.flipX = character.dataFlipX
        }
    }
    character.Die = ()=>{
        if(!character.is_dead)
        {
            character.is_dead = true
            console.info('character sprites',character)
            character.use(sprite(character.sprites.dead))
            character.play("dead")
            character.flipX = character.dataFlipX
        }
    }
    character.Shield = ()=>{
        if(!character.is_dead)
        {
            character.flipX = character.dataFlipX
            character.use(sprite(character.sprites.shield))
            character.play("shield")
        }
    }
    character.getBackToIdle = ()=>{
        if(!character.is_dead)
        {
            if(character.isGrounded){
                character.is_jumping = false
            }
            character.Idle()
        }
    }
    character.Moveleft = () => {
        if(!character.is_dead)
        {
            if(character.isRunning){
                if(!character.isMoving && !character.is_jumping)
                {
                    character.isMoving = true
                    character.Run()
                }
            }
            else
            {
                if(!character.isMoving && !character.is_jumping)
                {
                    character.isMoving = true
                    character.Walk()
                }
            }
            character.flipX = true
            character.dataFlipX = true
            character.move(character.speed * (character.isRunning ? 5 : 1) *-1,0)
        }
    }
    character.Moveright = () => {
        if(!character.is_dead)
        {
            if(character.isRunning){
                if(!character.isMoving && !character.is_jumping)
                {
                    character.isMoving = true
                    character.Run()
                }
            }
            else
            {
                if(!character.isMoving && !character.is_jumping)
                {
                    character.isMoving = true
                    character.Walk()
                }
            }
            character.flipX = false
            character.dataFlipX = false
            character.move(character.speed * (character.isRunning ? 5 : 1) *1,0)
        }
    }
    character.attack_1 = () => {
        if(!character.is_dead)
        {
            character.flipX = character.dataFlipX
            if(!character.is_attacking){
                character.use(sprite(character.sprites.attack_1))
                character.play('attack_1')
                play(character.sprites.attack_1.toLowerCase().match('shinobi')?'woo':'oh')
                setTimeout(
                    ()=>{
                        const xMargin   = (character.flipX ? -1 : 1) * (character.width / 2)
                        const xPos      = ((character.flipX ? -1 : 0) * (character.width)) + xMargin
                        character.attack = add(
                            [
                                area({shape:new Rect(vec2(0),character.width,character.height)}),
                                pos(character.pos.x + xPos - (character.width/2),character.pos.y),
                                body(),
                                lifespan(1, {
                                    fade: 0.25 // it start fading 0.5 second after time
                                }),
                                character.playername+'attack_1'
                            ]
                        )
                    },200
                )
                character.is_attacking = true
            }
        }
    }
    character.attack_2 = () => {
        if(!character.is_dead)
        {
            character.flipX = character.dataFlipX
            if(!character.is_attacking){
                character.use(sprite(character.sprites.attack_2))
                character.play('attack_2')
                play(character.sprites.attack_1.toLowerCase().match('shinobi')?'woo':'oh')
                setTimeout(
                    ()=>{
                        const xMargin   = (character.flipX ? -1 : 1) * (character.width / 2)
                        const xPos      = (character.flipX ? -1 : 0) * (character.width) + xMargin
                        character.attack = add(
                            [
                                area({shape:new Rect(vec2(0),character.width,character.height)}),
                                pos(character.pos.x + xPos - (character.width/2),character.pos.y),
                                body(),
                                lifespan(1, {
                                    fade: 0.25 // it start fading 0.5 second after time
                                }),
                                character.playername+'attack_2'
                            ]
                        )
                    }
                )
                character.is_attacking = true
            }
        }
    }
    character.attack_3 = () => {
        if(!character.is_dead)
        {
            character.flipX = character.dataFlipX
            if(!character.is_attacking){
                character.use(sprite(character.sprites.attack_3))
                character.play('attack_3')
                play(character.sprites.attack_1.toLowerCase().match('shinobi')?'woo':'oh')
                setTimeout(
                    ()=>{
                        const xMargin   = (character.flipX ? -1 : 1) * (character.width / 2)
                        const xPos      = (character.flipX ? -1 : 0) * (character.width) + xMargin
                        character.attack = add(
                            [
                                area({shape:new Rect(vec2(0),character.width,character.height)}),
                                pos(character.pos.x + xPos - (character.width/2),character.pos.y),
                                body(),
                                lifespan(1, {
                                    fade: 0.25 // it start fading 0.5 second after time
                                }),
                                character.playername+'attack_3'
                            ]
                        )
                    }
                
                )
                character.is_attacking = true
            }
        }
    }
    character.Moveup = () => {
        if(!character.is_dead)
        {
            character.Jump()
        }
    }
    character.onUpdate(
        ()=>{
            if(!character.is_dead)
            {
                if(character.isGrounded() && (character.is_jumping))
                {
                    character.Idle() 
                }
            }
        }
    )
    character.Idle()
    return character
}
k.switchCursorSprite = (cursor,charactername) => {
    spritename = k.CHARACTER_MENU[charactername]
    if(spritename)
    {
        cursor.use(sprite(spritename))
        cursor.name = charactername
        cursor.cursor_name.text = charactername
    }
}