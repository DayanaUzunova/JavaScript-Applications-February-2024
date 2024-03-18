const URL = "http://localhost:3030/jsonstore/advanced/dropdown";
import {dataApi} from "../requester.js";

//две функции за взимане и добавяне на данни
async function getAllOptions(){
    return await dataApi.get(URL);
}

async function postNewOption(data){
    return await dataApi.post(URL, data);
}

//export-ваме ги навън
export const dataService = {
    getAllOptions,
    postNewOption
}