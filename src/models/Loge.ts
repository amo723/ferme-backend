import { Document, Schema, model } from "mongoose";


export const StatusLogeDict = { "desactivee": "0", "activee": "1" };


export type LogeDocument = Document & {
    typeLoge: string,
    libelle: string,
    active: boolean,
    dateActivationDesactivation: Date,
}

export type LogeInput = {
  typeLoge: string;
  libelle: string;
  active: boolean;
  dateActivationDesactivation: Date;
};

const LogeSchema = new Schema({

    /* champs de données utiles à la creation de la rencontre */
    typeLoge: {
        type: String,
    },
    libelle: {
        type: String,
    },
    active: {
      type: Boolean,
      default: false,
    },
    dateActivationDesactivation: {
        type: Date,
        default: new Date(),
    }

}, {
    collection: 'Loges'
});

export const LogeModel = model<LogeDocument>("Loge", LogeSchema);
