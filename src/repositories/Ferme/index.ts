import { TypeRepository } from "../TypeRepository";
import ProdHospitalRepository from "./prodRepository";
import FermeRepository from "./repository";

export function getFermeRepository(t: TypeRepository = "fake"): FermeRepository {
    if (t === "fake") {
        return new FermeRepository();
    }
    return new ProdHospitalRepository();
}
