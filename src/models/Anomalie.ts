import { Document, Schema, model } from "mongoose";

export type AnomalieDocument = Document & {
  anomalie: string;
  dateConstatAnomalie: Date;
};

export type AnomalieInput = {
  anomalie: string;
  dateConstatAnomalie: Date;
};

const AnomalieSchema = new Schema(
  {
    /* champs de données utiles à la creation de la rencontre */
    anomalie: {
      type: String,
    },
    dateConstatAnomalie: {
      type: Date,
      //unique: true,
    },
  },
  {
    collection: "Anomalies",
  }
);

export const AnomalieModel = model<AnomalieDocument>(
  "Anomalie",
  AnomalieSchema
);
