<script>
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { lyraStore, wickStore, remathStore, remechanicsStore, ranpStore, pcStore, thunderbirdStore, celStore, razzlyStore, liceStore, deldStore, breezyStore, vetalaStore, folidarStore, baamStore, figmentStore } from '$lib/utils/stores.js'
    import { get } from 'svelte/store';
    export let data;
    //console.log($lyraStore.hp)
    let storeMap = new Map([['DaddyWick:', wickStore] , ['Lyramis:', lyraStore], ['Remath:', remathStore], ['The25thBaam:', baamStore], ['Folidar:', folidarStore], ['Razzly:', razzlyStore], ['Vetala:', vetalaStore], ['McBreezy:', breezyStore], ['Remechanics:', remechanicsStore], ['Ranperre:', ranpStore], ['ProfessorCat:', pcStore], ['Thunderbird:', thunderbirdStore], ['Celerity:', celStore], ['Lice:', liceStore], ['Deldaron:', deldStore], ['Addled Figment', figmentStore]]);
    let dataObj = data.data
    console.log(dataObj)
    let listOfPlayers = Object.keys(dataObj ?? {}) 
    console.log(listOfPlayers)
    let q = []
    let isAuth = false;
    let roomId = ''
    let pwd = ''
    import ioClient from 'socket.io-client'
    let testList = ['DaddyWick']
    const socket = ioClient()
    socket.on('dps:update', json => {
        //console.log(json)
        console.log(json)
        q.push(json)
    })
    socket.on('auth', ({data}) => {
        console.log(data)
        dataObj = data
        isAuth= true
        listOfPlayers = Object.keys(dataObj)
    })
    const login = async() => {
        if (roomId.length < 0 && pwd.length < 0) {
            alert('Room Id and Password cant be empty. NERF/ICE BUNNY')
            return
        }
        console.log(roomId, pwd)
        socket.emit('register:dps', {roomId, pwd})
    }
    socket.on('error', msg => {
        alert(msg)
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
                        //console.log(player in dataObj)i
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
  
  {#if !isAuth}
  <input placeholder="Room id..." type="text" bind:value={roomId}>
  <input placeholder="Room password..." type="text" bind:value={pwd}>
  <button type="button" on:click={login}>Join Room</button>
  {:else}
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
                    <TableBodyCell>{Number(dataObj[p].hp).toLocaleString('en', { useGrouping: true })} ({dataObj[p].lastHp})</TableBodyCell>
                    <TableBodyCell>{Number(dataObj[p].ar).toLocaleString('en', { useGrouping: true })} ({dataObj[p].lastAr})</TableBodyCell>
                </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
  {/if}
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
