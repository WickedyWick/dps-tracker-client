export const clearDb = () => {
    dataMap = new Map(Object.entries(defaultDataObj))
}
export const defaultDataObj = {
    'DaddyWick': {
        hp: 0,
        ar: 0,
        lastHp:0,
        lastAr:0
    },
    'Folidar': {
        hp: 0,
        ar: 0,
        lastHp:0,
        lastAr:0
    },
    'Remath': {
        hp: 0,
        ar: 0,
        lastHp:0,
        lastAr:0
    },
    'Celerity': {
        hp: 0,
        ar: 0,
        lastHp:0,
        lastAr:0
    },
    'Lyramis': {
        hp: 0,
        ar: 0,
        lastHp:0,
        lastAr:0
    },
    'Lice': {
        hp: 0,
        ar: 0,
        lastHp:0,
        lastAr:0
    },
    'Vetala': {
        hp: 0,
        ar: 0,
        lastHp:0,
        lastAr:0
    },
    'Addled Figment': {
        hp: 0,
        ar: 0,
        lastHp:0,
        lastAr:0
    },
    'Stun Trap': {
        hp: 0,
        ar: 0,
        lastHp:0,
        lastAr:0
    },
    'Deldaron': {
        hp: 0,
        ar: 0,
        lastHp:0,
        lastAr:0
    },
    'Remechanics': {
        hp: 0,
        ar: 0,
        lastHp:0,
        lastAr:0
    },
    'Ranperre': {
        hp: 0,
        ar: 0,
        lastHp:0,
        lastAr:0
    },
    'McBreezy': {
        hp: 0,
        ar: 0,
        lastHp:0,
        lastAr:0
    },
    'ProfessorCat': {
        hp: 0,
        ar: 0,
        lastHp:0,
        lastAr:0
    },
    'Thunderbird': {
        hp: 0,
        ar: 0,
        lastHp:0,
        lastAr:0
    },
    'Razzly': {
        hp: 0,
        ar: 0,
        lastHp:0,
        lastAr:0
    },
    'The25thBaam': {
        hp: 0,
        ar: 0,
        lastHp:0,
        lastAr:0
    }
}

export class DB {
    constructor() {
      this.map = new Map(Object.entries(defaultDataObj))
    }
    getPlayer(player) {
        return this.map.get(player)
    }
    setPlayer(player) {
        return this.map.get(player)
    }

    clearDb() {
        this.map = new Map(Object.entries(defaultDataObj))
    }

    exportDb() {
        return Object.fromEntries(this.map.entries())
    }
}

export default new DB()




