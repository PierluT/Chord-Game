spriteAnimations = [

    "mozart-salto-dx" = { 
        loc: [ { x: 170, y: 0},
               { x: 850, y: 20},
               { x: 1460, y: 0},
               { x: 2130, y: 0},
               { x: 2770, y: 0} ]

    },
    "mozart-salto-sx" = {
        loc: [{ x: 170, y : 0},
              { x: 820, y: 0},
              { x: 1460, y : 0},
              { x: 2100, y: 0},
              { x:2730, y: 0} ]
    },

    "mozart-frontale-dx" = {
        loc: [ { x:0, y: 0 } ]
    },

    "mozart-frontale-sx" = {
        loc: [ { x:0, y: 0 } ]
    },

    "beethoven-salto-dx" = {
        loc: [{ x: 210, y : 0},
            { x: 860, y: 0},
            { x: 1510, y : 0},
            { x: 2140, y: 0},
            { x: 2790, y: 0},
            { x: 3420, y: 0} ]
    },
    "beethoven-salto-sx" = {
        loc: [{ x: 210, y : 0},
            { x: 860, y: 0},
            { x: 1510, y : 0},
            { x: 2140, y: 0},
            { x: 2790, y: 0},
            { x: 3420, y: 0}]
    },

    "beethoven-frontale-dx" = {
        loc: [ { x:0, y: 0 } ]
    },
    
    "beethoven-frontale-sx" = {
        loc: [ { x:0, y: 0 } ]
    },

];

const animationStates = [
    {
        name: 'mozart-salto-dx',
        frames: 5,

    },
    {
        name: 'mozart-salto-sx',
        frames: 5,
    },
    {
        name: 'mozart-frontale-sx',
        frames: 1,
    },
    {
        name: 'mozart-frontale-dx',
        frames: 1,
    },
    {
        name: 'beethoven-salto-dx',
        frames: 6,
    },
    {
        name: 'beethoven-salto-sx',
        frames: 6,
    },
    {
        name: 'beethoven-frontale-dx',
        frames: 1,
    },
    {
        name: 'beethoven-frontale-sx',
        frames: 1,
    }
];

animationStates.forEach((state,index) => {
    let frames = {
        loc: [],
    }
})