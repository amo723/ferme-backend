import { Document, Schema, model } from "mongoose";

export type TraitementProphylactiqueDocument = Document & {
    dateAdminisrationTraitement: Date,
}

const TraitementProphylactiqueSchema = new Schema({

    /* champs de données utiles à la creation de la rencontre */
    dateAdminisrationTraitement: {
        type: Date,
    },
}, {
    collection: 'TraitementProphylactiques'
});

export const TraitementProphylactiqueModel = model<TraitementProphylactiqueDocument>("TraitementProphylactique", TraitementProphylactiqueSchema);
