import axios from "axios";
import type { FlashcardGet } from "../Models/Flashcard";
//import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5136/flashcards";

export const getFlashcardAPI = async (id: string | null = null) => {
  try {
    const fullApiString = id ? api + `/${id}` : api;
    const data = await axios.get<FlashcardGet[]>(fullApiString);
    //console.log(data);
    return data;
  } catch (error) {
    //handleError(error);
    console.log(error);
  }
};
