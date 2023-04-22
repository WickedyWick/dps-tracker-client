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
            console.log('sleeping') 
            await new Promise(r => setTimeout(r, this.sleep));
        } else {
          const queueObj = this.dequeue()
          const data = queueObj.data
          if (!data) continue
          if (data.length <= 0) continue
          const socket = queueObj.socket
          //['DaddyWick', 'Lyramis', 'Remath', 'Remechanics', 'Ranperre', 'ProfessorCat', 'Thunderbird', 'Celerity', 'Lice', 'Deldaron', 'McBreezy', 'Vetala', 'Razzly', 'Folidar', 'The25thBaam']
          //let dataToSend = new Map([['DaddyWick:', { hp: 0, ar: 0 }] , ['Lyramis:', { hp: 0, ar: 0 }], ['Remath:', { hp: 0, ar: 0 }], ['The25thBaam:', { hp: 0, ar: 0 }], ['Folidar:', { hp: 0, ar: 0 }], ['Razzly:', { hp: 0, ar: 0 }], ['Vetala:', { hp: 0, ar: 0 }], ['McBreezy:', { hp: 0, ar: 0 }], ['Remechanics:', { hp: 0, ar: 0 }], ['Ranperre:', { hp: 0, ar: 0 }], ['ProfessorCat:', { hp: 0, ar: 0 }], ['Thunderbird:', { hp: 0, ar: 0}], ['Celerity:', { hp: 0, ar: 0 }], ['Lice:', { hp: 0, ar: 0 }], ['Deldaron:', { hp: 0, ar: 0 }]]);
          let dataToSend = new Map()
          for (let j =0; j< data.length; j++) {
            try {
              console.log(`processing: ${data[j]}`)
              const msgSplit = data[j].split('.')[0].split(' ')
              let hIndex = -1
              let aIndex = -1
              if (msgSplit.length == 7) {
                for ( let i = 0; i < msgSplit.length; i++) {
                    if (msgSplit[i] == 'health')
                        hIndex = i
                    else if (msgSplit[i] == 'armor')
                        aIndex = i
                }
                let hpDmg = msgSplit[1]
                let arDmg = msgSplit[4]
                let player = msgSplit[0]
                console.log(player)
                dataToSend.set(player, { hp: hpDmg, ar: arDmg})
                
              } else {
                  console.log(`Invalid autopsy case: ${data[j]}`)
              }
            } catch(err) {
              console.error(`Error : ${err}\nMsg: ${data[j]}`)
            }
          }

          let json = JSON.stringify(Object.fromEntries(dataToSend))
          socket.to('dps').emit('dps:update', json)
        }
      }
    }

}