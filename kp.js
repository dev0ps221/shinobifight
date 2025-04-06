kaplay()

const k = {
    options:{},
}
k.loadCharacterSprites  = ()=> {
    loadSprite('Fighter_idle','Fighter/Idle.png',{
        sliceX:6,
        sliceY:1,
        anims:{'iddle':{from:0,to:5}}
    })
    loadSprite('Fighter_run','Fighter/Run.png',{
        sliceX:8,
        sliceY:1,
        anims:{'iddle':{from:0,to:7}}
    })
    loadSprite('Fighter_walk','Fighter/Walk.png',{
        sliceX:8,
        sliceY:1,
        anims:{'iddle':{from:0,to:7}}
    })
    loadSprite('Fighter_dead','Fighter/Dead.png',{
        sliceX:3,
        sliceY:1,
        anims:{'iddle':{from:0,to:2}}
    })
    loadSprite('Fighter_hurt','Fighter/Hurt.png',{
        sliceX:3,
        sliceY:1,
        anims:{'iddle':{from:0,to:2}}
    })
    loadSprite('Fighter_jump','Fighter/Jump.png',{
        sliceX:10,
        sliceY:1,
        anims:{'iddle':{from:0,to:9}}
    })
    loadSprite('Fighter_shield','Fighter/Shield.png',{
        sliceX:2,
        sliceY:1,
        anims:{'iddle':{from:0,to:1}}
    })
    loadSprite('Fighter_attack1','Fighter/Attack_1.png',{
        sliceX:4,
        sliceY:1,
        anims:{'iddle':{from:0,to:3}}
    })
    loadSprite('Fighter_attack2','Fighter/Attack_2.png',{
        sliceX:3,
        sliceY:1,
        anims:{'iddle':{from:0,to:2}}
    })
    loadSprite('Fighter_attack3','Fighter/Attack_3.png',{
        sliceX:4,
        sliceY:1,
        anims:{'iddle':{from:0,to:3}}
    })

    loadSprite('Shinobi_idle','Shinobi/Idle.png',{
        sliceX:6,
        sliceY:1,
        anims:{'iddle':{from:0,to:5}}
    })
    loadSprite('Shinobi_run','Shinobi/Run.png',{
        sliceX:8,
        sliceY:1,
        anims:{'iddle':{from:0,to:7}}
    })
    loadSprite('Shinobi_walk','Shinobi/Walk.png',{
        sliceX:8,
        sliceY:1,
        anims:{'iddle':{from:0,to:7}}
    })
    loadSprite('Shinobi_dead','Shinobi/Dead.png',{
        sliceX:4,
        sliceY:1,
        anims:{'iddle':{from:0,to:3}}
    })
    loadSprite('Shinobi_hurt','Shinobi/Hurt.png',{
        sliceX:2,
        sliceY:1,
        anims:{'iddle':{from:0,to:1}}
    })
    loadSprite('Shinobi_jump','Shinobi/Jump.png',{
        sliceX:10,
        sliceY:1,
        anims:{'iddle':{from:0,to:9}}
    })
    loadSprite('Shinobi_shield','Shinobi/Shield.png',{
        sliceX:4,
        sliceY:1,
        anims:{'iddle':{from:0,to:3}}
    })
    loadSprite('Shinobi_attack1','Shinobi/Attack_1.png',{
        sliceX:5,
        sliceY:1,
        anims:{'iddle':{from:0,to:4}}
    })
    loadSprite('Shinobi_attack2','Shinobi/Attack_2.png',{
        sliceX:3,
        sliceY:1,
        anims:{'iddle':{from:0,to:2}}
    })
    loadSprite('Shinobi_attack3','Shinobi/Attack_3.png',{
        sliceX:4,
        sliceY:1,
        anims:{'iddle':{from:0,to:3}}
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
        'GAME_NAME'         : "SHINOBI FIGHT GAME",
        'GAME_AUTHOR'       : "DEV0PS221 (EL HADJI SEYBATOU MBENGUE)",
        'GAME_GITHUB'       : "https://github.com/dev0ps221/shinobifight",
    }
    k.GAME_TEXTS        =   {
        'TITLE'                 : "SHINOBI FIGHT GAME",
        'SUBTITLE'              : "A SHINOBI FIGHT GAME",
        'SELECT_CHARACTER'      : "CHOOSE YOUR FIGHTER",
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
k.defineConstants()
k.init                  = () => {
    k.defineOptions()
    k.loadAssets()
    k.initScenes()
}