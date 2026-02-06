import axios from "axios";
import type { UserProfileToken } from "../Models/User";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5136/account/";

export const loginAPI = async (username: string, password: string) => {
  try {
        const data = await axios.post<UserProfileToken>(api + "login", {
            username: username,
            password: password,
        });

        return data;
  } catch (error) {
        handleError(error);
  }
};

export const registerAPI = async (email: string, username: string, password: string) => {
  try {
        const data = await axios.post<UserProfileToken>(api + "register", {
            email: email,
            username: username,
            password: password,
        });

        return data;
  } catch (error) {
        handleError(error);
  }
};