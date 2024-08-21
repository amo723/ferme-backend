import { Document, Schema, model } from "mongoose";


export type MutationDocument = Document & {
    sujetMute: string,
    dateMutation: Date,
}

const MutationSchema = new Schema({

    /* champs de données utiles à la creation de la rencontre */
    sujetMute: {
        type: String,
        unique: true
    },
    dateMutation: {
      type: Date,
      default: new Date(),
    },
}, {
    collection: 'Mutations'
});

export const MutationModel = model<MutationDocument>("Mutation", MutationSchema);
