import axios from "axios";
import type { FlashcardGet, FlashcardPost, FlashcardPut } from "../Models/Flashcard";
import { handleError } from "../Helpers/ErrorHandler";
//import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5136/flashcards";

export const getFlashcardAPI = async (id: string | null = null) => {
  try {
      const fullApiString = id ? api + `/${id}` : api;
      const data = await axios.get<FlashcardGet[]>(fullApiString);
      return data;
  } catch (error) {
      handleError(error);
  }
};

export const getFlashcardsByAuthorAPI = async (author: string) => {
  try {
      const data = await axios.get<FlashcardGet[]>(api + `?authorusername=${author}`);
      return data;
  } catch (error) {
      handleError(error);
  }
};

export const addFlashcardApi = async (keyword: string, definition: string, setId: string) => {
  try {
      const data = await axios.post<FlashcardPost>("http://localhost:5136/sets/" + `${setId}/flashcards`, {
        keyword: keyword,
        definition: definition
      });
      return data;
  } catch (error) {
      handleError(error);
  }
}

export const updateFlashcardApi = async (keyword: string, definition: string, fId: string) => {
  try {
      const data = await axios.put<FlashcardPut>(api + `/${fId}`, {
        keyword: keyword,
        definition: definition
      });
      return data;
  } catch (error) {
      handleError(error);
  }
}

export const deleteFlashcardApi = async (id: string) => {
  try {
      const data = await axios.delete<FlashcardPut>(api + `/${id}`);
      return data;
  } catch (error) {
      handleError(error);
  }
}