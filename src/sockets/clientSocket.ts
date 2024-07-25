import { io } from "socket.io-client";

const backendURL = import.meta.env.VITE_BACKEND_URL;
console.log("sba", backendURL);
export const socket = io(backendURL);
