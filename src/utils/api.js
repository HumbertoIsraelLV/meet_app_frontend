import axios from "axios";

// const serverApi = "http://localhost:5002/api";
const serverApi = "https://meet-app-backend.herokuapp.com/api";

export const getRoomExists = async (roomId) => {
    const response = await axios.get(`${serverApi}/room-exists/${roomId}`);
    return response.data;
};