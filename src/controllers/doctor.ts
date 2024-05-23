import { TALK_PASSWORD, TALK_USER } from "src/repositories/env";
import Room from "../models/Room";
import { getRoomRepository } from "../repositories/Room";
import RoomRepository from "../repositories/Room/repository";
import BaseController from "./base";
import HospitalRepository from "src/repositories/Hospital/repository";
import { getHospitalRepository } from "src/repositories/Hospital";
import { Request, Response } from "express";

class DoctorController extends BaseController {

    hospital_rep: HospitalRepository = getHospitalRepository("good");
    room_rep: RoomRepository = getRoomRepository("good");

    async createRoom(req: Request, res: Response) {
        try {

            const doctor_id = req.params.id;
            const { patient_id } = req.body;
            const patient_name = (await this.hospital_rep.getPatientDetail(patient_id)).names;

            const room = await this.room_rep.createRoom(`${doctor_id}#${patient_id}`);
            await this.room_rep.addRoomParticipant(doctor_id, room.token);
            await this.addPatient(patient_id, patient_name, room);

            res.status(201).json(room);
        } catch (error) {
            res.status(405).json({ message: error as string });
        }
    }

    /**
     * add a patient on a room
     * @param patient_id patient id
     * @param patient_name patient name
     * @param room room for the patient
     */
    async addPatient(patient_id: string, patient_name: string, room: Room): Promise<void> {
        try {
            const password = await this.room_rep.getPasswordUser(patient_id);
            await this.room_rep.createUser(patient_id, patient_name, password);
            await this.room_rep.addRoomParticipant(patient_id, room.token);

        } catch (error) { }
    }

    async getRelatedRoom(req: Request, res: Response) {
        try {
            const doctor_id = req.params.id;
            const patient_id = req.params.id;

            const rooms = await this.room_rep.getRelatedRooms(`${TALK_USER}`, `${TALK_PASSWORD}`);
            const room = rooms.find((element) => {
                return element.name === `${doctor_id}#${patient_id}`
            })
            if (room) {
                res.status(201).json(room);
            } else {
                res.status(404).json({ message: "room not exit" });
            }
        } catch (error) {
            res.status(405).json({ message: error as string });
        }
    }

    async getRelatedRooms(req: Request, res: Response) {
        try {
            const doctor_id = req.params.id;
            const rooms = await this.room_rep.getRelatedRooms(`${TALK_USER}`, `${TALK_PASSWORD}`);
            res.status(201).json(rooms.filter((element) => {
                return element.name.split('#')[0] === `${doctor_id}`
            }));
        } catch (error) {
            res.status(405).json({ message: error as string });
        }
    }

    async getRoomDemands(req: Request, res: Response) {

    }

    async validRommDemand(req: Request, res: Response) {

    }

    async leaveRoomDemand(req: Request, res: Response) {

    }

}

export default DoctorController;
