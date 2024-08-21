import { Document, Schema, model } from "mongoose";

export const SortieSujetDict = {
  vente: "0",
  deces: "1",
  transfert: "2",
};

export type SortieSujetDocument = Document & {
  IDLoge: string;
  typeSortie: string;
  sortieSujetDate: Date;
};

export type SortieSujetInput = {
  IDLoge: string;
  typeSortie: string;
  sortieSujetDate: Date;
};

const SortieSujetSchema = new Schema(
  {
    IDLoge: {
      type: String,
    },
    typeSortie: {
      type: String,
      default: SortieSujetDict["vente"],
    },
    nbreSujet: {
      type: Number,
      default: 0,
    },
    sortieSujetDate: {
      type: Date,
      default: new Date(),
    },
  },
  {
    collection: "SortieSujets",
  }
);

// Middleware to increment nbreSujet before saving
SortieSujetSchema.pre("save", function (next) {
  // Incrémente nbreSujet
  this.nbreSujet += 1;
  next();
});

export const SortieSujetModel = model<SortieSujetDocument>(
  "SortieSujet",
  SortieSujetSchema
);
