import { Document, Schema, model } from "mongoose";

export type TypeLogeDocument = Document & {
  type: number;
  surface: string;
  capaciteMax: string;
};

export type TypeLogeInput = {
  surface: string;
  capaciteMax: string;
};

const TypeLogeSchema = new Schema(
  {
    /* champs de données utiles à la creation de la rencontre */
    surface: {
      type: String,
      unique: true,
    },
    capaciteMax: {
      type: String,
      default: "",
    },
  },
  {
    collection: "TypeLoges",
  }
);

export const TypeLogeModel = model<TypeLogeDocument>(
  "TypeLoge",
  TypeLogeSchema
);
