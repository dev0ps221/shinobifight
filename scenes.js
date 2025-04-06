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
                sprite(k.CHARACTER_SPRITES[k.CHARACTERS[0]]),
                pos(k.LAYOUT.width/4, k.LAYOUT.height/2),
                scale(4),
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
                sprite(k.CHARACTER_SPRITES[k.CHARACTERS[1]]),
                pos(k.LAYOUT.width - (k.LAYOUT.width/4) , k.LAYOUT.height/2),   
                scale(4),
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
        background.onButtonPress("PLAYER_1_JUMP",()=>{
            k.player_1_cursor.selected = true
            k.player_1_cursor.cursor_name.use(
                color(255, 0, 0)
            )
            // player_1_cursor.play('attack_1')
        })
        background.onButtonPress("PLAYER_2_JUMP",()=>{
            k.player_2_cursor.selected = true
            k.player_2_cursor.cursor_name.use(
                color(255, 0, 0)
            )
        })
    },
    "options" : () => {
        
    },
    "fight" : () => {
        
    },
    "choose_character" : () => {
        
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