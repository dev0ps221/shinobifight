kaplay()

const k = {
    options:{},
}
k.loadCharacterSprites  = ()=> {
    loadSprite('Fighter_idle','Fighter/Idle.png',{
        sliceX:6,
        sliceY:1,
        anims:{'idle':{from:0,to:5,loop:true}}
    })
    loadSprite('Fighter_run','Fighter/Run.png',{
        sliceX:8,
        sliceY:1,
        anims:{'run':{from:0,to:7,loop:true}}
    })
    loadSprite('Fighter_walk','Fighter/Walk.png',{
        sliceX:8,
        sliceY:1,
        anims:{'walk':{from:0,to:7,loop:true}}
    })
    loadSprite('Fighter_dead','Fighter/Dead.png',{
        sliceX:3,
        sliceY:1,
        anims:{'dead':{from:0,to:2,loop:true}}
    })
    loadSprite('Fighter_hurt','Fighter/Hurt.png',{
        sliceX:3,
        sliceY:1,
        anims:{'hurt':{from:0,to:2,loop:true}}
    })
    loadSprite('Fighter_jump','Fighter/Jump.png',{
        sliceX:10,
        sliceY:1,
        anims:{'jump':{from:0,to:9,loop:true}}
    })
    loadSprite('Fighter_shield','Fighter/Shield.png',{
        sliceX:2,
        sliceY:1,
        anims:{'shield':{from:0,to:1,loop:true}}
    })
    loadSprite('Fighter_attack1','Fighter/Attack_1.png',{
        sliceX:4,
        sliceY:1,
        anims:{'attack_1':{from:0,to:3}}
    })
    loadSprite('Fighter_attack2','Fighter/Attack_2.png',{
        sliceX:3,
        sliceY:1,
        anims:{'idle':{from:0,to:2,loop:true}}
    })
    loadSprite('Fighter_attack3','Fighter/Attack_3.png',{
        sliceX:4,
        sliceY:1,
        anims:{'idle':{from:0,to:3,loop:true}}
    })

    loadSprite('Shinobi_idle','Shinobi/Idle.png',{
        sliceX:6,
        sliceY:1,
        anims:{'idle':{from:0,to:5,loop:true}}
    })
    loadSprite('Shinobi_run','Shinobi/Run.png',{
        sliceX:8,
        sliceY:1,
        anims:{'run':{from:0,to:7,loop:true}}
    })
    loadSprite('Shinobi_walk','Shinobi/Walk.png',{
        sliceX:8,
        sliceY:1,
        anims:{'walk':{from:0,to:7,loop:true}}
    })
    loadSprite('Shinobi_dead','Shinobi/Dead.png',{
        sliceX:4,
        sliceY:1,
        anims:{'dead':{from:0,to:3,loop:true}}
    })
    loadSprite('Shinobi_hurt','Shinobi/Hurt.png',{
        sliceX:2,
        sliceY:1,
        anims:{'hurt':{from:0,to:1,loop:true}}
    })
    loadSprite('Shinobi_jump','Shinobi/Jump.png',{
        sliceX:10,
        sliceY:1,
        anims:{'jump':{from:0,to:9,loop:true}}
    })
    loadSprite('Shinobi_shield','Shinobi/Shield.png',{
        sliceX:4,
        sliceY:1,
        anims:{'shield':{from:0,to:3,loop:true}}
    })
    loadSprite('Shinobi_attack1','Shinobi/Attack_1.png',{
        sliceX:5,
        sliceY:1,
        anims:{'attack_1':{from:0,to:4}}
    })
    loadSprite('Shinobi_attack2','Shinobi/Attack_2.png',{
        sliceX:3,
        sliceY:1,
        anims:{'idle':{from:0,to:2,loop:true}}
    })
    loadSprite('Shinobi_attack3','Shinobi/Attack_3.png',{
        sliceX:4,
        sliceY:1,
        anims:{'idle':{from:0,to:3,loop:true}}
    })
}
k.loadAssets            = () => {
    loadSprite('warzone','war_zone.jpg')
    k.loadCharacterSprites()
}

k.defineConstants       = () => {
    k.LAYOUT            =   {
        width:2000,
        height:1109,
    }
    k.GAME_INFOS        =   {
        GAME_NAME         : "SHINOBI FIGHT GAME",
        GAME_AUTHOR       : "DEV0PS221 (EL HADJI SEYBATOU MBENGUE)",
        GAME_GITHUB       : "https://github.com/dev0ps221/shinobifight",
    }
    k.GAME_TEXTS        =   {
        TITLE                 : "SHINOBI FIGHT GAME",
        SUBTITLE              : "A SHINOBI FIGHT GAME",
        SELECT_CHARACTER      : "CHOOSE YOUR FIGHTER",
    }
    k.CHARACTERS            =   ['FIGHTER','SHINOBI']
    k.CHARACTER_SPRITES     =   {
        'FIGHTER'           : 'Fighter',
        'SHINOBI'           : 'Shinobi',
    }
    k.CHARACTER_MENU     =   {
        'FIGHTER'           : 'Fighter_idle',
        'SHINOBI'           : 'Shinobi_idle',
    }
    k.PLAYER_1_TEXT         =   'PLAYER 1'
    k.PLAYER_2_TEXT         =   'PLAYER 2'
    k.PLAYER_1_DEFAULT_X    =   k.LAYOUT.width/4
    k.PLAYER_2_DEFAULT_X    =   k.LAYOUT.width - (k.LAYOUT.width/4)
    k.PLAYER_1_DEFAULT_Y    =   k.LAYOUT.height/2
    k.PLAYER_2_DEFAULT_Y    =   k.LAYOUT.height/2
    k.PLAYER_1_DEFAULT_POS  =   pos(k.PLAYER_1_DEFAULT_X, k.PLAYER_1_DEFAULT_Y)
    k.PLAYER_2_DEFAULT_POS  =   pos(k.PLAYER_2_DEFAULT_X, k.PLAYER_2_DEFAULT_Y)
    k.BUTTONS               =   {
        PLAYER_1_LEFT : {
            keyboard : ["a"]
        },
        PLAYER_1_RIGHT : {
            keyboard : ["d"]
        },
        PLAYER_1_UP : {
            keyboard : ["w"]
        },   
        PLAYER_1_DOWN : {
            keyboard : ["s"]
        },
        PLAYER_2_LEFT : {
            keyboard : ["left"]
        },
        PLAYER_2_RIGHT : {
            keyboard : ["right"]
        },
        PLAYER_2_UP : {
            keyboard : ["up",  ]
        },   
        PLAYER_2_DOWN : {
            keyboard : ["down"]
        },
        PLAYER_1_JUMP : {
            keyboard : ["f"]
        },
        PLAYER_2_JUMP : {
            keyboard : ["shift"]
        },
    }

} 
k.optionIsSet           = (name) => {
    return name in k.options
}
k.setOption             = (name,value) => {
    k.options[name] = value
}
k.getOption             = (name) => {
    return k.optionIsSet(name) ? k.options[name] : null
}
k.defineOptions         = (options=[]) => {
    if(Array.isArray(options)){
        options.forEach(opt => {
            k.setOption(opt.name,opt.value)
        })
    }
}



//misc

k.moveCursorRight = (cursor)=> {
    k.moveCursor(cursor,cursor.idx+1)
}
k.moveCursorLeft = (cursor)=> {
    k.moveCursor(cursor,cursor.idx-1)
}
k.moveCursor = (cursor,idx) => {
    if(idx < 0)
    {
        idx = k.CHARACTERS.length - 1
    }
    if(idx >= k.CHARACTERS.length)
    {
        idx = 0
    }
    cursor.idx = idx
    k.switchCursorSprite(cursor,k.CHARACTERS[idx])
    cursor.flipX = cursor.dataFlipX
    cursor.play('idle')
}

//end misc

k.defineConstants()
k.init                  = () => {
    
    k.defineOptions()
    k.loadAssets()
    k.initScenes()
    setGravity(1200)
}