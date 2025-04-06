k.SCENES = {
    "main" : () => {
        const background = add([
            sprite("warzone"),
            pos(0,0),
        ])
        const title_text = background.add([
            text(k.GAME_TEXTS.TITLE, { size: 40 }),
            anchor("center"),
            pos(k.LAYOUT.width/2, k.LAYOUT.height/8),
            color(255, 255, 255)
        ])
        const subtitle_text = background.add([
            text(k.GAME_TEXTS.SUBTITLE, { size: 30 }),
            anchor("center"),
            pos(k.LAYOUT.width/2, k.LAYOUT.height/6),
        ])

        options = [
            {
                text : "PLAY",
                action : "choose_character",
                opt : null
            },
            {
                text : "OPTIONS",
                action : "options",
                opt : null
            }
        ]

        options = options.map(
            option => {
                option.opt =  background.add([
                    text(option.text, { size: 80 }),
                    anchor("center"),
                    pos(k.LAYOUT.width/2, k.LAYOUT.height/2 + options.indexOf(option) * 100),
                    color(255, 255, 255),
                    
                ])
                return option
            }
        )
        clearOptions = ()=>{
            options = options.map(
                option => {
                    option.opt.use(color(255, 255, 255))
                    return option
                }
            )
        }
        current_option = 0
        options[current_option].opt.use(color(155, 80, 0))
        background.onKeyPress("up", () => {
            current_option = (current_option - 1 + options.length) % options.length
            clearOptions()
            options[current_option].opt.use(color(155, 80, 0))
            
        })
        background.onKeyPress("down", () => {
            current_option = (current_option + 1) % options.length
            clearOptions()
            options[current_option].opt.use(color(155, 80, 0))
        })
        background.onKeyPress('enter',()=>{
            go(options[current_option].action)
        })
        background.add([
            text(k.GAME_INFOS.GAME_AUTHOR, { size: 30 }),
            anchor("center"),
            pos(k.LAYOUT.width/2, k.LAYOUT.height/1.2),
            color(255, 255, 255),
        ])
    },
    "options" : () => {
        
    },
    "fight" : () => {
        const background = add([
            sprite("warzone"),
            pos(0,0),
        ])
        const ground = add(
            [
                area({shape:new Rect(vec2(0),k.LAYOUT.width*4,k.LAYOUT.height - k.LAYOUT.height/3)}),
                pos(-k.LAYOUT.width,k.LAYOUT.height - k.LAYOUT.height/3),
                body({isStatic:true})
            ]
        )
        const leftwall = add(
            [
                area({shape:new Rect(vec2(0),20,k.LAYOUT.height)}),
                pos(0,0),
                body({isStatic:true})
            ]
        )
        const rightwall = add(
            [
                area({shape:new Rect(vec2(0),20,k.LAYOUT.height)}),
                pos(k.LAYOUT.width - 20,0),
                body({isStatic:true})
            ]
        )
        const player_1 = k.makePlayer(k.player_1_data,background)
        const player_2 = k.makePlayer({...k.player_2_data},background)
        k.player_1 = player_1
        k.player_2 = player_2
        player_2.flipX = player_2.dataFlipX;

        ['1','2'].forEach(
            player=>{

                (
                    ()=>{
                        [`PLAYER_${player}_LEFT`,`PLAYER_${player}_RIGHT`].forEach(
                            button=>{
                                background.onButtonRelease(
                                    button,()=>{
                                        k['player_'+player].Idle()
                                    }
                                )
                            }
                        )
                    }
                )()
        
                background.onButtonDown(
                    `PLAYER_${player}_LEFT`,()=>{
                        k['player_'+player].Moveleft()
                    }
                )
                background.onButtonDown(
                    `PLAYER_${player}_RIGHT`,()=>{
                        k['player_'+player].Moveright()
                    }
                )
                background.onButtonDown(
                    `PLAYER_${player}_JUMP`,()=>{
                        k['player_'+player].Jump()
                    }
                )
                background.onButtonDown(
                    `PLAYER_${player}_ATTACK_1`,()=>{
                        k['player_'+player].attack_1()
                    }
                )
                background.onButtonDown(
                    `PLAYER_${player}_ATTACK_2`,()=>{
                        k['player_'+player].attack_2()
                    }
                )
                background.onButtonDown(
                    `PLAYER_${player}_ATTACK_3`,()=>{
                        k['player_'+player].attack_3()
                    }
                )
                k['player_'+player].onAnimEnd(
                    (anim)=>{
                        console.info('animend',anim)
                        if(anim.match('attack'))
                        {
                            k['player_'+player].Idle()
                        }
                    }
                )
            }
        );


    },
    "choose_character" : () => {
        

        const background = add([
            sprite("warzone"),
            pos(0,0),
        ])
        
        const title_text = background.add([
            text(k.GAME_TEXTS.TITLE, { size: 40 }),
            anchor("center"),
            pos(k.LAYOUT.width/2, k.LAYOUT.height/8),
            color(255, 255, 255)
        ])
        const subtitle_text = background.add([
            text(k.GAME_TEXTS.SUBTITLE, { size: 30 }),
            anchor("center"),
            pos(k.LAYOUT.width/2, k.LAYOUT.height/6),
        ])
        const select_character_text = background.add([
            text(k.GAME_TEXTS.SELECT_CHARACTER, { size: 80 }),
            anchor("center"),
            pos(k.LAYOUT.width/2, k.LAYOUT.height/4),
        ])

        const player_1_text = background.add([
            text(k.PLAYER_1_TEXT, { size: 40 }),
            anchor("center"),
            pos(k.LAYOUT.width/4, k.LAYOUT.height/2 - 120),
        ])
        const player_2_text = background.add([
            text(k.PLAYER_2_TEXT, { size: 40 }),
            anchor("center"),
            pos(k.LAYOUT.width - (k.LAYOUT.width/4), k.LAYOUT.height/2 - 120),
        ])
        
        k.player_1_cursor = add(
            [
                sprite(k.CHARACTER_MENU[k.CHARACTERS[0]]),
                k.PLAYER_1_DEFAULT_POS,
                scale(3),
                anchor("center"),
                {
                    name : k.CHARACTERS[0],
                    idx:0
                }
            ]
        )
        k.player_1_cursor.cursor_name = k.player_1_cursor.add(
            [
                text(k.player_1_cursor.name, { size: 10 }),
                pos(-24, 68),
            ]
        )
        k.player_1_cursor.dataFlipX = false
        k.player_1_cursor.flipX     = k.player_1_cursor.dataFlipX
        k.player_1_cursor.play("idle")
        k.player_2_cursor = add(
            [
                sprite(k.CHARACTER_MENU[k.CHARACTERS[1]]),
                k.PLAYER_2_DEFAULT_POS,   
                scale(3),
                anchor("center"),
                {
                    name : k.CHARACTERS[1],
                    idx:1
                }
            ]
        )

        k.player_2_cursor.cursor_name = k.player_2_cursor.add(
            [
                text(k.player_2_cursor.name, { size: 10 }),
                pos(-24, 68),
            ]
        )
        k.player_2_cursor.dataFlipX = true
        k.player_2_cursor.flipX = k.player_2_cursor.dataFlipX
        k.player_2_cursor.play("idle")



        const readyToFight = () => 
        {
            k.player_1_cursor.use(sprite(k.CHARACTER_MENU[k.player_1_cursor.name].replace('_idle','_attack_1')))
            k.player_2_cursor.use(sprite(k.CHARACTER_MENU[k.player_2_cursor.name].replace('_idle','_attack_1')))
            k.player_1_cursor.flipX = k.player_1_cursor.dataFlipX
            k.player_2_cursor.flipX = k.player_2_cursor.dataFlipX
            k.player_1_cursor.play('attack_1')
            k.player_2_cursor.play('attack_1')
            setTimeout(
                ()=>{
                    k.player_1_data = {
                        character:k.player_1_cursor.name.replace('_idle',''),
                        playername:k.PLAYER_1_TEXT,
                        x:k.PLAYER_1_DEFAULT_X,
                        y:k.PLAYER_1_DEFAULT_Y,
                    }
                    k.player_2_data = {
                        character:k.player_2_cursor.name.replace('_idle',''),
                        playername:k.PLAYER_2_TEXT,
                        x:k.PLAYER_2_DEFAULT_X,
                        y:k.PLAYER_2_DEFAULT_Y,
                    }
                    go("fight")
                },800
            )
        }

        background.onButtonPress("PLAYER_1_LEFT", () => {
            if(!k.player_1_cursor.selected == true)
            {
                k.moveCursorLeft(k.player_1_cursor)
            }
        })
        background.onButtonPress("PLAYER_1_RIGHT", () => {
            if(!k.player_1_cursor.selected == true)
            {
                k.moveCursorRight(k.player_1_cursor)
            }
        })
        background.onButtonPress("PLAYER_2_LEFT", () => {
            if(!k.player_2_cursor.selected == true)
            {
                k.moveCursorLeft(k.player_2_cursor)
            }
        })
        background.onButtonPress("PLAYER_2_RIGHT", () => {
            if(!k.player_2_cursor.selected == true)
            {
                k.moveCursorRight(k.player_2_cursor)
            }
        })
        background.onButtonPress("PLAYER_1_ATTACK_1",()=>{
            k.player_1_cursor.selected = true
            k.player_1_cursor.cursor_name.use(
                color(255, 0, 0)
            )
            if(k.player_2_cursor.selected == true)
            {
                readyToFight()
            }
            // player_1_cursor.play('attack_1')
        })
        background.onButtonPress("PLAYER_2_ATTACK_1",()=>{
            k.player_2_cursor.selected = true
            k.player_2_cursor.cursor_name.use(
                color(255, 0, 0)
            )
            if(k.player_1_cursor.selected == true)
            {
                readyToFight()
            }
        })
    },
    "credits" : () => {
        
    }
}
k.initScenes = () => {
        Object.keys(k.SCENES).forEach(name => {
            scene(name,k.SCENES[name])
            console.info(`Scene ${name} loaded`)
        })
}