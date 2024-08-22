import { Request, Response } from "express";
import { LogeInput, LogeModel } from "../models/Loge";
import { ferme_rep } from "../repositories";

class LogeController {
  async getLoges(req: Request, res: Response) {
    try {
      const typeLoge = req.query.typeLoge;

      const filter = {};

      if (typeLoge) {
        filter["typeLoge"] = typeLoge as string;
      }

      const loges = await LogeModel.find(filter).exec();
      const output: Array<any> = [];

      for (let i = 0; i < loges.length; i++) {
        const element = loges[i];

        const loge = {
          id: element.id,
          libelle: element.libelle,
        };
        output.push(loge);
      }
      res.status(200).json({ results: output });
    } catch (error) {
      const err: any = error;
      res.status(405).send({ name: err.name, message: err.message });
    }
  }

  async newLoge(req: Request, res: Response) {
    try {
      const { typeLoge, libelle, active, date_activation_desactivation } =
        req.body;

      if (!typeLoge) {
        throw new Error("give type de loge");
      }

      if (!date_activation_desactivation) {
        throw new Error("give date d'activation ou de desactivation");
      }

      let loge = await LogeModel.findOne({
        typeLoge: typeLoge,
        libelle: libelle,
        active: active,
        dateActivationDesactivation: date_activation_desactivation,
      });

      if (loge) {
        // cette loge existe deja
        res.status(202).json({ typeLoge: loge.typeLoge });
      } else {
        // on crée une nouvelle loge
        const input: LogeInput = {
          typeLoge: typeLoge,
          libelle: libelle,
          active: active,
          dateActivationDesactivation: date_activation_desactivation,
        };

        loge = await LogeModel.create(input);

        res.status(201).json({
          id: loge.id,
          libelle: loge.libelle,
          typeLoge: loge.typeLoge,
        });
      }
    } catch (error) {
      const err: any = error;
      res.status(405).send({ name: err.name, message: err.message });
    }
  }

  async deleteLoge(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const result = await LogeModel.findByIdAndDelete(id);

      if (result) {
        console.log("Loge supprimée avec succès");
        res.status(204).json({ message: "Loge supprimée avec succès" });
      } else {
        console.log("Aucune loge trouvée avec cet ID");
      }
    } catch (error) {
      const err: any = error;
      res.status(405).send({ name: err.name, message: err.message });
    }
  }
}

export default LogeController;
