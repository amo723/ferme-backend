import { Request, Response } from "express";
import { EntreeSujetInput, EntreeSujetModel } from "../models/EntreeSujet";
import { ferme_rep } from "../repositories";
import { SortieSujetInput, SortieSujetModel } from "../models/SortieSujet";

class SujetController {
  async getSujets(req: Request, res: Response) {
    try {
      const typeEntree = req.query.type_entree;
      const entreeSujetDate = req.query.date_entree_sujet;

      const filter = {};

      if (typeEntree) {
        filter["typeEntree"] = typeEntree as string;
      }

      if (entreeSujetDate) {
        filter["entreeSujetDate"] = entreeSujetDate as string;
      }

      const sujets = await EntreeSujetModel.find(filter)
        .sort("-entreeSujetDate")
        .exec();
      const output: Array<any> = [];

      for (let i = 0; i < sujets.length; i++) {
        const element = sujets[i];

        const sujet = {
          id: element.id,
          id_loge: element.IDLoge,
          type: element.typeEntree,
          date: element.entreeSujetDate,
        };
        output.push(sujet);
      }
      res.status(200).json({ results: output });
    } catch (error) {
      const err: any = error;
      res.status(405).send({ name: err.name, message: err.message });
    }
  }

  async addSujet(req: Request, res: Response) {
    try {
      const { id_loge, type_entree, date_entree_sujet } = req.body;

      console.log(req.body);

      if (!type_entree) {
        throw new Error("give type entree");
      }

      let sujet = await EntreeSujetModel.findOne({
        IDLoge: id_loge,
        typeEntree: type_entree,
        entreeSujetDate: date_entree_sujet,
      });

      if (sujet) {
        // une demande a déjà est en attente
        res.status(202).json({ entreeSujetDate: sujet.entreeSujetDate });
      } else {
        // on crée une nouvelle demande
        const input: EntreeSujetInput = {
          IDLoge: id_loge,
          typeEntree: type_entree,
          entreeSujetDate: date_entree_sujet,
        };
        sujet = await EntreeSujetModel.create(input);

        res
          .status(201)
          .json({ id: sujet.id, entreeSujetDate: sujet.entreeSujetDate });
      }
    } catch (error) {
      const err: any = error;
      res.status(405).send({ name: err.name, message: err.message });
    }
  }

  async sortieSujet(req: Request, res: Response) {
    try {
      const { id_loge, type_sortie, date_sortie_sujet } = req.body;

      if (!type_sortie) {
        throw new Error("give type sortie");
      }

      let sujet = await SortieSujetModel.findOne({
        IDLoge: id_loge,
        typeSortie: type_sortie,
        sortieSujetDate: date_sortie_sujet,
      });

      if (sujet) {
        // une demande a déjà est en attente
        res.status(202).json({ sortieSujetDate: sujet.sortieSujetDate });
      } else {
        // on crée une nouvelle sortie
        const input: SortieSujetInput = {
          IDLoge: id_loge,
          typeSortie: type_sortie,
          sortieSujetDate: date_sortie_sujet,
        };
        sujet = await SortieSujetModel.create(input);

        res
          .status(201)
          .json({ id: sujet.id, sortieSujetDate: sujet.sortieSujetDate });
      }
    } catch (error) {
      const err: any = error;
      res.status(405).send({ name: err.name, message: err.message });
    }
  }
}

export default SujetController;
