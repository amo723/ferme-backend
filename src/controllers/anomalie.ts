import { Request, Response } from "express";
import { AnomalieInput, AnomalieModel } from "../models/Anomalie";
import { ferme_rep } from "../repositories";

class anomalie_obsController {
  async getAnomalies(req: Request, res: Response) {
    try {
      const typeLoge = req.query.typeLoge;

      const filter = {};

      if (typeLoge) {
        filter["typeLoge"] = typeLoge as string;
      }

      const anomalies = await AnomalieModel.find(filter).exec();
      const output: Array<any> = [];

      for (let i = 0; i < anomalies.length; i++) {
        const element = anomalies[i];

        const anomalie_obs = {
          id: element.id,
          anomalie: element.anomalie,
        };
        output.push(anomalie_obs);
      }
      res.status(200).json({ results: output });
    } catch (error) {
      const err: any = error;
      res.status(405).send({ name: err.name, message: err.message });
    }
  }

  async newAnomalie(req: Request, res: Response) {
    try {
      const { anomalie, date_constat } = req.body;

      console.log(req.body);

      if (!anomalie) {
        throw new Error("give anomalie");
      }

      if (!date_constat) {
        throw new Error("give date constat");
      }

      let anomalie_obs = await AnomalieModel.findOne({
        anomalie: anomalie,
        dateConstatAnomalie: date_constat,
      });

      if (anomalie_obs) {
        // cette anomalie_obs existe deja
        res
          .status(202)
          .json({ dateConstatAnomalie: anomalie_obs.dateConstatAnomalie });
      } else {
        // on crée une nouvelle anomalie_obs
        const input: AnomalieInput = {
          anomalie: anomalie,
          dateConstatAnomalie: date_constat,
        };

        anomalie_obs = await AnomalieModel.create(input);

        res.status(201).json({
          id: anomalie_obs.id,
          anomalie: anomalie_obs.anomalie,
          dateConstatAnomalie: anomalie_obs.dateConstatAnomalie,
        });
      }
    } catch (error) {
      const err: any = error;
      res.status(405).send({ name: err.name, message: err.message });
    }
  }
}

export default anomalie_obsController;
