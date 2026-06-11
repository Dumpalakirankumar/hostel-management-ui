import api from "../api/axios";

export const getAllResidents = async () => {
  const response = await api.get("/residents");
  return response.data;
};

export const createResident = async (residentData) => {
  const response = await api.post(
    "/residents",
    residentData
  );
  return response.data;
};