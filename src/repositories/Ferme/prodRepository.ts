import { O3_BASE64, O3_BASEF_URL, O3_BASE_URL } from "../env";
import FermeRepository from "./repository";
import { EntreeSujet } from "../../models/EntreeSujet";
import { BadResponse } from "../errors";


class ProdSujetRepository extends FermeRepository {

    async getPatientDetail(sujet_id: string): Promise<EntreeSujet> {

        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Basic ${O3_BASE64}`);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        const result: EntreeSujet = await fetch(`${O3_BASE_URL}/patient/${sujet_id}?v=full`, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new BadResponse(`Impossible de recuperer les details du patient depuis l'hopital (${response.status})`, "O3")
            })
            .then(result => {
                const sujet = result;
                return {
                    id: result.id,
                    typeEntree: result.typeEntree,
                    nbreSujet: result.nbreSujet,
                    entreeSujetDate: result.entreeSujetDate,
                }
            })

        return result;
    }
}

export default ProdSujetRepository