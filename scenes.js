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