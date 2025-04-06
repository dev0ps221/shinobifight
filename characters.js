k.makePlayer = (data,parent) => {
    const {character,playername} = data
    const spritename = k.CHARACTER_SPRITES[character]
    const player_data = {
        speed:data.speed ?? 460,
        jumpForce:data.jumpForce ?? 20,
        x:data.x,
        y:data.y,
        flipX:data.flipX
    };
    ['idle','run','attack','walk','jump','run','shield','attack_1','attack_2','attack_3'].forEach(action => {
        player_data['spritename_'+action] = spritename+'_'+action
    })
    return k.makeCharacter({...player_data,playername},parent)
}
k.makeCharacter = (data,parent=null)=>{
    const addfunc = parent ? parent.add : add
    console.info(data,'is player data')
    let character = add([
        pos(data.x,data.y),
        scale(4),
        area({shape:new Rect(vec2(0),16,42)}),
        body({stickToPlatform: true}),
        anchor('center'),
        data.playername,
        {health:100},
    ])
    character.sprites = {
        "idle"              :   data.spritename_idle,
        "run"               :   data.spritename_run,
        "walk"              :   data.spritename_walk,
        "jump"              :   data.spritename_jump,
        "hurt"              :   data.spritename_hurt,
        "shield"            :   data.spritename_shield,
        "attack_1"          :   data.spritename_attack_1,
        "attack_2"          :   data.spritename_attack_2,
        "attack_3"          :   data.spritename_attack_3,
    }
    character.isJumping = false
    character.isMoving = false
    character.isRunning = false
    character.speed=data.speed ?? 460
    character.jumpForce=data.jumpForce ?? 20
    character.dataflipX=data.flipX
    
    
    
    character.Idle = ()=>{
        character.isRunning = false
        character.isMoving = false
        character.use(sprite(character.sprites.idle))
        character.play("idle")
        character.flipX = character.dataFlipX
    }
    character.Run = ()=>{
        if(!character.isJumping){
            character.use(sprite(character.sprites.run))
            character.play("run")
        }
    }
    character.Walk = ()=>{
        character.use(sprite(character.sprites.walk))
        character.play("walk")
    }
    character.Jump = ()=>{
        character.use(sprite(character.sprites.jump))
        character.play("jump")
        character.isJumping = true
        character.jump(character.jumpForce)
    }
    character.Hurt = ()=>{
        character.use(sprite(character.sprites.hurt))
        character.play("hurt")
    }
    character.Shield = ()=>{
        character.use(sprite(character.sprites.shield))
        character.play("shield")
    }
    character.getBackToIdle = ()=>{
        if(this.isGrounded){
            character.isJumping = false
        }
        character.Idle
    }
    character.Moveleft = () => {
        if(character.isRunning){
            if(!character.isMoving)
            {
                character.isMoving = true
                character.Run()
            }
        }
        else
        {
            if(!character.isMoving)
            {
                character.isMoving = true
                character.Walk()
            }
        }
        character.flipX = true
        character.dataFlipX = true
        character.move(character.speed*-1,0)
    }
    character.Moveright = () => {
        if(character.isRunning){
            if(!character.isMoving)
            {
                character.isMoving = true
                character.Run()
            }
        }
        else
        {
            if(!character.isMoving)
            {
                character.isMoving = true
                character.Walk()
            }
        }
        character.flipX = false
        character.dataFlipX = false
        character.move(character.speed*1,0)
    }
    character.Moveup = () => {
        character.Jump()
    }
    character.Idle()
    return character
}
k.switchCursorSprite = (cursor,charactername) => {
    spritename = k.CHARACTER_SPRITES[charactername]
    if(spritename)
    {
        cursor.use(sprite(spritename))
        cursor.name = charactername
        cursor.cursor_name.text = charactername
    }
}