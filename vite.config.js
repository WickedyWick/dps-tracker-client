import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { Server } from 'socket.io';
import { Queue } from './src/lib/utils/queue'
import { clearDb } from "./src/lib/crappyDb"


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
				socket.on('local', dataToSend => {
					//socket.to('dps').emit('dps:update', msg)
					//console.log(`Data: ${dataToSend}`)
					queue.enqueue({
						data: dataToSend,
						socket: socket
					})
				})
				socket.on('register:dps', () => {
					socket.join('dps')
				})
				socket.on('reset', () => {
					clearDb()
				})
			})
		}
	}]
});
