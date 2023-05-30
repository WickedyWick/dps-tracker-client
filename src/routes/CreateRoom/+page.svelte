<script>
    /** @type {import('./$types').PageData} */
    export let data;
    import { Button, Input } from 'flowbite-svelte';
    let pwd = '';
    let iPwd = true;
    let iPlst = true;
    let playerList = ''
    $: {
        iPwd = (pwd.length < 4)
        iPlst = (pwd.length == 0 || pwd.length > 240)
    }
    let auth = false;
    let roomId = -1;
    import ioClient from 'socket.io-client'
    const socket = ioClient()
    socket.on('success', id => {
        auth = true
        roomId = id
    })
    socket.on('error', () => {
        auth = false
        alert('There was an error. Ofc its your fault. Try again nerd lololol. (for real now, report it to maker)')
    })
    const createRoom = async() => {
        try {
            if (iPwd || iPlst)
            return alert('Password and playerlist invalid format')
            console.log(pwd, playerList)
            socket.emit('createRoom', ({pwd, playerList}))
            /*
            const res = await fetch('/CreateRoom', {
                method: "POST",
                body: JSON.stringify({
                    pwd: pwd,
                    playerListString: playerList
                }),
                mode: 'no-cors'
            })
            if (res.status == 200) {
                auth = true
                const roomIdd = await res.json()
                console.log(roomIdd)
                roomId = roomIdd
                return
            }
`           */
           
        } catch(err) {
            auth = false
            console.error(err)
            alert('There was an error. Ofc its your fault. Try again nerd lololol. (for real now, report it to maker)')
        }
        
    }

</script>
<Input placeholder="Enter password for the room..." bind:value={pwd}/>
<small hidden={!iPwd}>Password must be at 4 characters, your password has {pwd.length}</small>
<Input placeholder="Enter players in player1|player2|player3 etc format" bind:value={playerList}/>
<small>When entering multiple players do it as in  <i><b>player1|player2|player3</b></i> format. Player names must be same as their ingame names and are case sensitive.</small>
<small hidden={!iPlst}>Playerlist can't be empty</small>
<Button on:click={createRoom}>Create Room</Button>
<Button on:click={() => window.location.href="/Track"}>Join Room</Button>
<h1 hidden={!auth}>Successful room creation , your room Id is {roomId} (Don't forget it)</h1>