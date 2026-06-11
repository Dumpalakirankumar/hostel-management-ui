import api from "../api/axios";

export const getAllBeds = async () => {
  const response = await api.get("/beds");
  return response.data;
};

export const createBed = async (bedData) => {
  const response = await api.post("/beds", bedData);
  return response.data;
};