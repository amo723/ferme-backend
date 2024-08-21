import Room from "../models/SortieSujet";
import { TALK_HOST, TALK_PORT } from "../repositories/env";

class BaseController {

    /**
    * get a room link
    * @param room room
    * @returns 
    */
    async getRoomURL(room: Room): Promise<string> {
        return `http://${TALK_HOST}:${TALK_PORT}/call/${room.token}`;
    }
}

export default BaseController;
