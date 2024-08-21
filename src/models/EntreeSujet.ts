import { Document, Schema, model } from "mongoose";

export const EntreeSujetDict = {
  achat: "0",
  eclosion: "1",
  mutation: "2",
};

export type EntreeSujetDocument = Document & {
  IDLoge: string;
  typeEntree: string;
  entreeSujetDate: Date;
};

export type EntreeSujetInput = {
  IDLoge: string;
  typeEntree: string;
  entreeSujetDate: Date;
};

const EntreeSujetSchema = new Schema(
  {
    IDLoge: {
      type: String,
    },
    typeEntree: {
      type: String,
      default: EntreeSujetDict["achat"],
    },
    nbreSujet: {
      type: Number,
      default: 0,
    },
    entreeSujetDate: {
      type: Date,
      default: new Date(),
    },
  },
  {
    collection: "EntreeSujets",
  }
);

// Middleware to increment nbreSujet before saving
EntreeSujetSchema.pre("save", function (next) {
  // Incrémente nbreSujet
  this.nbreSujet += 1;
  next();
});

export const EntreeSujetModel = model<EntreeSujetDocument>(
  "EntreeSujet",
  EntreeSujetSchema
);

export interface EntreeSujet {
  id: string;
  IDLoge: string;
  typeEntree: string;
  nbreSujet: number;
  entreeSujetDate: Date;
}
