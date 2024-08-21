import { Document, Schema, model } from "mongoose";


export const StatusTransfertDict = { "pay": "0", "unpay": "1" };


export type TransfertDocument = Document & {
    sujetTransfere: string,
    dateTransfert: Date,
}

const TransfertSchema = new Schema({

    /* champs de données utiles à la creation de la rencontre */
    sujetTransfere: {
        type: String,
        unique: true
    },
    dateTransfert: {
      type: Date,
      default: new Date(),
    },
}, {
    collection: 'Transferts'
});

export const TransfertModel = model<TransfertDocument>("Transfert", TransfertSchema);
