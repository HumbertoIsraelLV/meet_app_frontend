import axios from "axios";

const serverApi = "http://localhost:5002/api";
// const serverApi = "https://meet-app-backend.herokuapp.com/api";

export const getRoomExists = async (roomId) => {
    const response = await axios.get(`${serverApi}/room-exists/${roomId}`);
    return response.data;
};

export const addNPoints = async (roomId, identity, points) => {
    const response = await axios.get(`${serverApi}/add-points?roomId=${roomId}&identity=${identity}&points=${points}`);
    return response.data;
};

export const getScores = async () => {
    const response = await axios.get(`${serverApi}/get-scores`);
    return response.data;
};