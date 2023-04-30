import { redisDb } from "../server/rdb"
export const auth = async(roomId, pwd) => {

    const pwdRecord = await redisDb.get(`${roomId}:pwd`)
    if (!pwdRecord)
        return false
    // plain text is fine for this use case
    return pwdRecord == pwd
}

export const updateDps = (playerName, roomId, hpDmg, arDmg) => {
    try {
        // prob coould pull update whole document and just set it again
        // but lets practice this in case we have to deal with race conditions
       // console.log(playerName, arDmg, hpDmg)
        const key = `${playerName}:${roomId}`
        console.log(key)
        redisDb.hIncrBy(key, 'hp', hpDmg)
        redisDb.hIncrBy(key, 'ar', arDmg)
        redisDb.hSet(key, 'lastHp', hpDmg)
        redisDb.hSet(key, 'lastAr', arDmg)
    } catch(err) {
        console.error(`Error updating dps: ${err}\nPlayerName: ${playerName}\nRoomId: ${roomId}\nValue ${roomId}`)
    }
    
}

export const createRoom = async(pwd, playerListString) => {
    try {

        if (!pwd || !playerListString || pwd.length < 4 || playerListString.length > 240) {
            return -1;
        }
        const roomId = await redisDb.hIncrBy('idTracker', 'num', 1)
        const playerList = playerListString.split(';')
        await redisDb.set(`${roomId}:pwd`, pwd)
        
        for (let i = 0; i< playerList.length; i++) {
            let playerName = playerList[i].trim()
            if (playerName != '') {
                await redisDb.rPush(`plst:${roomId}`, palyerName)
                await redisDb.hSet(`${playerName}:${roomId}`, {
                    hp: 0,
                    ar: 0,
                    lastHp: 0,
                    lastAr: 0
                })
            }
                
        }

        return roomId

    } catch(err) {
        console.error(`Error during creating room: ${err}\nPwd: ${pwd}\nPlayerListString: ${playerListString}`)
        return -1
    }
}

export const getDataForRoom = async(roomId, pwd) => {
    let playerList = await redisDb.lRange(`plst:${roomId}`,0 , -1)
    const data = {}
    for( let i = 0 ; i < playerList.length; i++) {
        let d = await redisDb.hGetAll(`${playerList[i]}:${roomId}`)
        data[playerList[i]] = d
    }
    return data;
}