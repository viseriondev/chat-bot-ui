import { io } from "socket.io-client";

const StorageKey: string = "USER_MOBILE";

export const SetID = (ID: string) => {
     return localStorage.setItem(StorageKey, ID);
};

export const GetID = () => {
     return localStorage.getItem(StorageKey);
};

export const RemoveID = () => {
     return localStorage.removeItem(StorageKey);
};

export const webSocket = io("http://localhost:8000/");
