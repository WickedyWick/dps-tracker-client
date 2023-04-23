<script>
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { lyraStore, wickStore, remathStore, remechanicsStore, ranpStore, pcStore, thunderbirdStore, celStore, razzlyStore, liceStore, deldStore, breezyStore, vetalaStore, folidarStore, baamStore, figmentStore } from '$lib/utils/stores.js'
    import { get } from 'svelte/store';
    export let data;
    //console.log($lyraStore.hp)
    let storeMap = new Map([['DaddyWick:', wickStore] , ['Lyramis:', lyraStore], ['Remath:', remathStore], ['The25thBaam:', baamStore], ['Folidar:', folidarStore], ['Razzly:', razzlyStore], ['Vetala:', vetalaStore], ['McBreezy:', breezyStore], ['Remechanics:', remechanicsStore], ['Ranperre:', ranpStore], ['ProfessorCat:', pcStore], ['Thunderbird:', thunderbirdStore], ['Celerity:', celStore], ['Lice:', liceStore], ['Deldaron:', deldStore], ['Addled Figment', figmentStore]]);
    let dataObj = data.data
    console.log(dataObj)
    let listOfPlayers = Object.keys(dataObj)
    console.log(listOfPlayers)
    let q = []
    
    import ioClient from 'socket.io-client'
    let testList = ['DaddyWick']
    const socket = ioClient()
    socket.emit('register:dps')
    socket.on('dps:update', json => {
        //console.log(json)
        q.push(json)
    })

    const startQueue = async() => {
        while(true) {
            if (q.length == 0) {
                await new Promise(r => setTimeout(r, 500));
            } else {
                const data = JSON.parse(q.pop())
                
                //console.log(data)
                try {
                    //console.log(data[0])
                    for (let key in data){
                        
                        const player = key
                       // console.log(player)
                        const dmgObj = data[player]
                        //console.log(player in dataObj)
                        dataObj[player].hp = Number(dataObj[player].hp) + Number(dmgObj.hp)
                        dataObj[player].ar = Number(dataObj[player].ar) + Number(dmgObj.ar)
                        dataObj[player].lastHp = dmgObj.hp
                        dataObj[player].lastAr = dmgObj.ar
                       // store.set(obj => { hp= obj.hp += dmgObj.hp })
                    }
                } catch(err) {
                    console.log(data)
                    console.error(err)
                }
                
            }
        }
    }
    startQueue()
  </script>
  
  <Table>
    <TableHead>
      <TableHeadCell>Player</TableHeadCell>
      <TableHeadCell>Health</TableHeadCell>
      <TableHeadCell>Armor</TableHeadCell>
    </TableHead>
    <TableBody class="divide-y">
    {#each listOfPlayers as p}
        <TableBodyRow>
            <TableBodyCell>{p}</TableBodyCell>
            <TableBodyCell>{dataObj[p].hp} ({dataObj[p].lastHp})</TableBodyCell>
            <TableBodyCell>{dataObj[p].ar} ({dataObj[p].lastAr})</TableBodyCell>
        </TableBodyRow>
    {/each}

    <!--
    {#each listOfPlayers as p}
        {@const item = get(storeMap.get(p))}
        <TableBodyRow>
            <TableBodyCell>{p}</TableBodyCell>
            
            <TableBodyCell>{item.hp}</TableBodyCell>
            <TableBodyCell>{item.ar}</TableBodyCell>
        </TableBodyRow>
    {/each}
    -->
    <!--
      <TableBodyRow>
        <TableBodyCell>DaddyWick</TableBodyCell>
        <TableBodyCell>{hDw}</TableBodyCell>
        <TableBodyCell>{aDw}</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>Lice</TableBodyCell>
        <TableBodyCell>{hLice}</TableBodyCell>
        <TableBodyCell>{aLice}</TableBodyCell>
      </TableBodyRow>
     -->
    </TableBody>
   
  </Table>