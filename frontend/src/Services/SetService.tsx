import axios from "axios";
import type { SetDetailedGet, SetGet, SetPost, SetPut } from "../Models/Set";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5136/sets";

export const setGetAPI = async (name: string | null = null) => {
  try {
      const data = await axios.get<SetGet[]>(api + `?setname=${name}`);
      return data;
  } catch (error) {
      handleError(error);
  }
};

export const getAuthorsSetsAPI = async (author: string) => {
    try {
        const data = await axios.get<SetDetailedGet[]>(api + `?authorusername=${author}`);
        return data;
    } catch (error) {
        handleError(error);
    }
}

export const setDetailsGetAPI = async (id: string | null = null) => {
  try {
      const fullApiString = id ? api + `/${id}` : api;
      const data = await axios.get<SetDetailedGet>(fullApiString);
      return data;
  } catch (error) {
      handleError(error);
  }
};

export const fullSetsGetAPI = async () => {
  try {
      const data = await axios.get<SetDetailedGet[]>(api);
      return data;
  } catch (error) {
      handleError(error);
  }
};

export const addSetAPI = async (setname: string) => {
  try {
      const data = await axios.post<SetPost>(api, {name: setname});
      return data;
  } catch (error){
      handleError(error);
  }
};

export const updateSetAPI = async (setid: string, setname: string) => {
  try {
      const data = await axios.put<SetPut>(api + `/${setid}`, {name: setname});
      return data;
  } catch (error){
      handleError(error);
  }
};