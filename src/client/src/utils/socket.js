import { io } from "socket.io-client";

// const socketDomain = "https://bggj-10-65.herokuapp.com/"

// const socket = io(socketDomain)
const socket = io()

export const getSocket = () => (socket)