import { Request, Response } from "express";
import BaseController from "./base";
import { hospital_rep } from "../repositories";

class PatientController extends BaseController {

    async getPatient(req: Request, res: Response) {
        try {
            const patient_id = req.params.id
            const patient = await hospital_rep.getPatientDetail(patient_id);
            res.status(200).json(patient);
        } catch (error) {
            res.status(405).json({ message: error });
        }
    }

    async getVisits(req: Request, res: Response) {
        try {
            const patient_id = req.params.id
            const visits = await hospital_rep.getVisits(patient_id);
            res.status(200).json({ results: visits });
        } catch (error) {
            res.status(405).json({ message: error });
        }
    }

}

export default PatientController;
