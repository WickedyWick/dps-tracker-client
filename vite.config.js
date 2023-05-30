import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { Server } from 'socket.io';
import { Queue } from './src/lib/utils/queue'
import { clearDb } from "./src/lib/crappyDb"
import { auth, getDataForRoom } from './src/lib/utils/service';
import { createRoom } from './src/lib/utils/service';
export default defineConfig({
	plugins: [sveltekit(),
	{
		name: 'sveltekit-socket-io',
		async configureServer(server) {
			const io = new Server(server.httpServer);
			let queue = new Queue(500)
			console.log('Socket io injected')
			io.on('connection', (socket) => {
				console.log('connection')
				try {
					socket.on('createRoom', async({pwd, playerList}) => {
						console.log('createroom', pwd, playerList)
						const id = await createRoom(pwd, playerList)
						if (id == -1)
							socket.emit('error')
						else
							socket.emit('success', id)
					})
					socket.on('local', async({dataToSend, roomId, pwd}) => {
						//socket.to('dps').emit('dps:update', msg)
						//console.log(`Data: ${dataToSend}`)
						// auth prob not needed due to unique roomid:pwd socket rooms
						// but we keep it so we dont insert whatever data in the db
						console.log(dataToSend, roomId, pwd)
						const isAuth = await auth(roomId, pwd)
						if (!isAuth)
							socket.emit('error', 'Invalid room/pwd config')
						else
							queue.enqueue({
								data: dataToSend,
								roomId: roomId,
								pwd: pwd,
								socket: socket
							})
					})
					socket.on('register:dps', async({roomId, pwd}) => {
						const isAuth = await auth(roomId, pwd)
						if (!isAuth)
							socket.emit('error', 'Invalid room/pwd config')
						else {
							socket.join(`${roomId}:${pwd}`)
							const data = await getDataForRoom(roomId, pwd)
							socket.emit('auth', {data})
						}
							
					})
					socket.on('reset', () => {
						clearDb()
					})
				} catch(err) {
					console.error(err)
				}
				
			})
		}
	}]
});
