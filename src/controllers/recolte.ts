import { Request, Response } from "express";
import { RecolteInput, RecolteModel } from "../models/Recolte";
import { ferme_rep } from "../repositories";

class RecolteController {
  async getRecoltes(req: Request, res: Response) {
    try {
      const typeLoge = req.query.typeLoge;

      const filter = {};

      if (typeLoge) {
        filter["typeLoge"] = typeLoge as string;
      }

      const recoltes = await RecolteModel.find(filter).exec();
      const output: Array<any> = [];

      for (let i = 0; i < recoltes.length; i++) {
        const element = recoltes[i];

        const recolte = {
          id: element.id,
          nbrePonte: element.nbrePonte,
        };
        output.push(recolte);
      }
      res.status(200).json({ results: output });
    } catch (error) {
      const err: any = error;
      res.status(405).send({ name: err.name, message: err.message });
    }
  }

  async newRecolte(req: Request, res: Response) {
    try {
      const { id_loge, nbre_ponte, observation, date_recolte } = req.body;

      console.log(req.body);

      if (!id_loge) {
        throw new Error("give loge");
      }

      if (!date_recolte) {
        throw new Error("give date récolte");
      }

      let recolte = await RecolteModel.findOne({
        IdLoge: id_loge,
        nbrePonte: nbre_ponte,
        observation: observation,
        dateRecolte: date_recolte,
      });

      if (recolte) {
        // cette recolte existe deja
        res.status(202).json({ dateRecolte: recolte.dateRecolte });
      } else {
        // on crée une nouvelle recolte
        const input: RecolteInput = {
          IdLoge: id_loge,
          nbrePonte: nbre_ponte,
          observation: observation,
          dateRecolte: date_recolte,
        };

        recolte = await RecolteModel.create(input);

        res.status(201).json({
          id: recolte.id,
          nbrePonte: recolte.nbrePonte,
          observation: recolte.observation,
          dateRecolte: recolte.dateRecolte,
        });
      }
    } catch (error) {
      const err: any = error;
      res.status(405).send({ name: err.name, message: err.message });
    }
  }
}

export default RecolteController;
