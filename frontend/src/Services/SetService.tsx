import axios from "axios";
import type { SetDetailedGet, SetGet, SetPost } from "../Models/Set";
//import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5136/sets";

export const setGetAPI = async (name: string) => {
  try {
    const data = await axios.get<SetGet[]>(api + `?setname=${name}`);
    console.log(data);
    return data;
  } catch (error) {
    //handleError(error);
    console.log(error);
  }
};

export const setDetailsGetAPI = async (id: string) => {
  try {
    const data = await axios.get<SetDetailedGet>(api + `/${id}`);
    //console.log(data);
    return data;
  } catch (error) {
    //handleError(error);
    console.log(error);
  }
};