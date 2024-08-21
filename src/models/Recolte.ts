import { Document, Schema, model } from "mongoose";

export const StatusRecolteDict = {
  vente: "0",
  deces: "1",
};

export type RecolteDocument = Document & {
  TypeSortie: string;
  nbrePonte: number;
  dateRecolte: Date;
  observation: string;
};

export type RecolteInput = {
  IdLoge: string;
  nbrePonte: number;
  dateRecolte: Date;
  observation: string;
};

const RecolteSchema = new Schema(
  {
    IdLoge: {
      type: String,
    },
    nbrePonte: {
      type: Number,
      default: 0,
    },
    dateRecolte: {
      type: Date,
      default: new Date(),
    },
    observation: {
      type: String,
      default: "RAS",
    },
  },
  {
    collection: "Recoltes",
  }
);

export const RecolteModel = model<RecolteDocument>("Recolte", RecolteSchema);
