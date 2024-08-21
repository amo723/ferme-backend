import { Request, Response } from "express";
import { TypeLogeInput, TypeLogeModel } from "../models/TypeLoge";
import { ferme_rep } from "../repositories";

class TypeLogeController {
  async getTypeLoges(req: Request, res: Response) {
    try {
      const surface = req.query.surface;

      const filter = {};

      if (surface) {
        filter["surface"] = surface as string;
      }

      const typeLoges = await TypeLogeModel.find(filter)
        .sort("-surface")
        .exec();
      const output: Array<any> = [];

      for (let i = 0; i < typeLoges.length; i++) {
        const element = typeLoges[i];

        const typeLoge = {
          id: element.id,
          surface: element.surface,
          capaciteMax: element.capaciteMax,
        };
        output.push(typeLoge);
      }
      res.status(200).json({ results: output });
    } catch (error) {
      const err: any = error;
      res.status(405).send({ name: err.name, message: err.message });
    }
  }

  async newTypeLoge(req: Request, res: Response) {
    try {
      const { surface, capacite_max } = req.body;

      if (!surface) {
        throw new Error("give surface");
      }

      if (!capacite_max) {
        throw new Error("give capacité maximale");
      }

      let typeLoge = await TypeLogeModel.findOne({
        surface: surface,
        capaciteMax: capacite_max,
      });

      if (typeLoge) {
        // ce type de loge existe deja
        res.status(202).json({ surface: typeLoge.surface });
      } else {
        // on crée un nouveau type de loge
        const input: TypeLogeInput = {
          surface: surface,
          capaciteMax: capacite_max,
        };

        typeLoge = await TypeLogeModel.create(input);

        res.status(201).json({ id: typeLoge.id, surface: typeLoge.surface });
      }
    } catch (error) {
      const err: any = error;
      res.status(405).send({ name: err.name, message: err.message });
    }
  }
}

export default TypeLogeController;
