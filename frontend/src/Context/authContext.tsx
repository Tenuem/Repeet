import { createContext, useEffect, useState } from "react";
import type { UserProfile } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

type UserContext = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (email: string, username: string, password: string) => void;
    loginUser: (username: string, password: string) => void;
    isLoggedIn: () => boolean;
    logoutUser: () => void;
}

interface Props {
    children: React.ReactNode
};

const UserContext = createContext<UserContext>({} as UserContext);

export const UserProvider = ({children} : Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState<boolean>(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (user && token){
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }
        setIsReady(true);
    }, []);

    const registerUser = async (email: string, username: string, password: string) => {
        await registerAPI(email, username, password)
            .then((res) => {
                if (res) {
                    localStorage.setItem("token", res?.data.token);
                    const userObject = {
                        username: res?.data.username,
                        email: res?.data.email
                    }
                    localStorage.setItem("user", JSON.stringify(userObject));
                    setToken(res?.data.token!);
                    setUser(userObject!);
                    toast.success("Registered successfully");
                    navigate(-1); // return to the previous page
                } 
            }).catch(_ => toast.warning("Server error"));
    }

    const loginUser = async (username: string, password: string) => {
        await loginAPI(username, password)
            .then((res) => {
                if (res) {
                    localStorage.setItem("token", res?.data.token);
                    const userObject = {
                        username: res?.data.username,
                        email: res?.data.email
                    }
                    console.log(res?.data);
                    localStorage.setItem("user", JSON.stringify(userObject));
                    setToken(res?.data.token!);
                    setUser(userObject!);
                    toast.success("Logged in successfully");
                    navigate(-1); // return to the previous page
                } 
            }).catch(_ => toast.warning("Server error"));
    };

    const isLoggedIn = () => {
        return !!user;
    };

    const logoutUser = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
        navigate(-1);
    };

    return (
        <UserContext.Provider value={{ loginUser, registerUser, user, token, logoutUser, isLoggedIn }} >
            {isReady ? children : null}
        </UserContext.Provider>
    )
}

export const useAuthContext = () => React.useContext(UserContext);