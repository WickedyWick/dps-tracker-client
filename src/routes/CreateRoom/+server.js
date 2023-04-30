/** @type {import('./$types').RequestHandler} */
import { createRoom } from '../../lib/utils/service';
export async function POST({ request }) {
    try {
        const data = JSON.parse(await request.text())
        const roomId = await createRoom(data.pwd, data.playerListString)
        console.log(roomId)
        return new Response(roomId, {
            status: roomId == -1 ? 500 : 200
        });
    } catch(err){
        console.error(err)
        return new Response(null, {
            status: 500
        })
    }
    
};