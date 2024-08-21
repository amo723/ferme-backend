import { EntreeSujet } from "../../models/EntreeSujet";

class FermeRepository {

    async getSujetDetail(sujet_id: string): Promise<EntreeSujet> {
        return {
            id: "44588",
            typeEntree: '1',
            nbreSujet: 0,
            entreeSujetDate: new Date("1962-09-09T00:00:00.000+0000"),
        }
    }
}

export default FermeRepository;