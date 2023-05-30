import { redisDb } from "../server/rdb";
import { updateDps } from "./service";
export class Queue {
    constructor(sleep) {
      this.items = {};
      this.front = 0;
      this.rear = 0;
      this.startQueue()
      this.sleep = sleep;
    }
    enqueue(item) {
      this.items[this.rear] = item;
      this.rear++;
    }
    dequeue() {
      const item = this.items[this.front];
      delete this.items[this.front];
      this.front++;
      return item;
    }
    peek() {
      return this.items[this.front];
    }
    get size() {
      return this.rear - this.front;
    }
    isEmpty() {
      return this.rear == 0;
    }

    async startQueue() {
      while(true) {
        if (this.size == 0) {
            await new Promise(r => setTimeout(r, this.sleep));
        } else {
          const queueObj = this.dequeue()
          const data = queueObj.data
          if (!data) continue
          if (data.length <= 0) continue
          const socket = queueObj.socket
          const roomId = queueObj.roomId
          const pwd = queueObj.pwd
          //['DaddyWick', 'Lyramis', 'Remath', 'Remechanics', 'Ranperre', 'ProfessorCat', 'Thunderbird', 'Celerity', 'Lice', 'Deldaron', 'McBreezy', 'Vetala', 'Razzly', 'Folidar', 'The25thBaam']
          //let dataToSend = new Map([['DaddyWick:', { hp: 0, ar: 0 }] , ['Lyramis:', { hp: 0, ar: 0 }], ['Remath:', { hp: 0, ar: 0 }], ['The25thBaam:', { hp: 0, ar: 0 }], ['Folidar:', { hp: 0, ar: 0 }], ['Razzly:', { hp: 0, ar: 0 }], ['Vetala:', { hp: 0, ar: 0 }], ['McBreezy:', { hp: 0, ar: 0 }], ['Remechanics:', { hp: 0, ar: 0 }], ['Ranperre:', { hp: 0, ar: 0 }], ['ProfessorCat:', { hp: 0, ar: 0 }], ['Thunderbird:', { hp: 0, ar: 0}], ['Celerity:', { hp: 0, ar: 0 }], ['Lice:', { hp: 0, ar: 0 }], ['Deldaron:', { hp: 0, ar: 0 }]]);
          let dataToSend = new Map()
          for (let j =0; j< data.length; j++) {
            try {
              console.log(`processing: ${data[j]}`)
              let splitArr = data[j].split(' ')
              let player = data[j].split(':')[0] ?? ''
              if (player == '')
                  continue
              let hp = 0
              let ar = 0;
              for (let j = 0; j< splitArr.length; j++) {
                if (splitArr[j] == 'health') {
                    hp = Number.parseInt(splitArr[j-1]) || 0
                    continue
                } 
                 
                if (splitArr[j] == 'armor') {
                    ar = Number.parseInt(splitArr[j-1]) || 0
                }
              }
              if (!dataToSend.has(player))
                dataToSend.set(player, { hp: hp, ar: ar })
              else {
                const dData = dataToSend.get(player)
                dData.hp = dData.hp + hp
                dData.ar = dData.ar + ar
                dataToSend.set(player, dData)
                
                
                //console.log(db.get(player))
              }
              updateDps(player, roomId, hp, ar)
            } catch(err) {
              console.error(`Error : ${err}\nMsg: ${data[j]}`)
            }
          }

          let json = JSON.stringify(Object.fromEntries(dataToSend))
          socket.to(`${roomId}:${pwd}`).emit('dps:update', json)
        }
      }
    }
}