import axios from "axios";
import type { SetDetailedGet, SetGet, SetPost } from "../Models/Set";
//import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5136/sets";

export const setGetAPI = async (name: string | null = null) => {
  try {
    const data = await axios.get<SetGet[]>(api + `?setname=${name}`);
    console.log(data);
    return data;
  } catch (error) {
    //handleError(error);
    console.log(error);
  }
};

export const setDetailsGetAPI = async (id: string | null = null) => {
  try {
    const fullApiString = id ? api + `/${id}` : api;
    const data = await axios.get<SetDetailedGet>(fullApiString);
    return data;
  } catch (error) {
    //handleError(error);
    console.log(error);
  }
};

export const fullSetsGetAPI = async () => {
  try {
    const data = await axios.get<SetDetailedGet[]>(api);
    return data;
  } catch (error) {
    //handleError(error);
    console.log(error);
  }
};

export const addSetAPI = async (setname: string) => {
  try {
    console.log(setname);
    const data = await axios.post<SetPost>(api, {Name: setname,});
    console.log(data);
    return data;
  } catch (error){
    console.log(error);
  }
};