import api from "../api/axios";

export const getAllRooms = async () => {
  const response = await api.get("/rooms");
  return response.data;
};

export const createRoom = async (roomData) => {
  const response = await api.post("/rooms", roomData);
  return response.data;
};