<script>
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { lyraStore, wickStore, remathStore, remechanicsStore, ranpStore, pcStore, thunderbirdStore, celStore, razzlyStore, liceStore, deldStore, breezyStore, vetalaStore, folidarStore, baamStore, figmentStore } from '$lib/utils/stores.js'
    import { get } from 'svelte/store';
    export let data;
    //console.log($lyraStore.hp)
    let storeMap = new Map([['DaddyWick:', wickStore] , ['Lyramis:', lyraStore], ['Remath:', remathStore], ['The25thBaam:', baamStore], ['Folidar:', folidarStore], ['Razzly:', razzlyStore], ['Vetala:', vetalaStore], ['McBreezy:', breezyStore], ['Remechanics:', remechanicsStore], ['Ranperre:', ranpStore], ['ProfessorCat:', pcStore], ['Thunderbird:', thunderbirdStore], ['Celerity:', celStore], ['Lice:', liceStore], ['Deldaron:', deldStore], ['Addled Figment', figmentStore]]);
    let dataObj = {}
    
    let listOfPlayers = Object.keys(dataObj ?? []) 
    console.log(listOfPlayers)
    let q = []
    let isAuth = false;
    let roomId = ''
    let pwd = ''
    let autoAuth = false
    import ioClient from 'socket.io-client'
    let testList = ['DaddyWick']
    const socket = ioClient()
    if (data.id != '' && data.pwd != '') {
        roomId = data.id
        pwd = data.pwd
        //console.log(roomId, pwd)
        autoAuth = true
        socket.emit('register:dps', {roomId, pwd})
    }

    socket.on('dps:update', json => {
        //console.log(json)
        console.log(json)
        q.push(json)
    })
    socket.on('auth', ({data}) => {
        console.log(data)
        dataObj = data
        isAuth= true
        autoAuth = false
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
  
  {#if autoAuth}
    <h1>Getting data...</h1>
  {:else if !isAuth}
  <input placeholder="Room id..." type="text" bind:value={roomId}>
  <input placeholder="Room password..." type="text" bind:value={pwd}>
  <button type="button" on:click={login}>Join Room</button>
  {:else}
    {#each listOfPlayers as p}
        <p style="color:white; font-size:36px">{p}: {Number(dataObj[p].hp).toLocaleString('en', { useGrouping: true })}HP {Number(dataObj[p].ar).toLocaleString('en', { useGrouping: true })}AR</p>
    {/each} 
  {/if}
