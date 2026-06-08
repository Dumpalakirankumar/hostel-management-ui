import api from "../api/axios";

export const getAllHostels = async () => {
  const response = await api.get("/hostels");
  return response.data;
};

export const createHostel = async (hostelData) => {
  const response = await api.post(
    "/hostels",
    hostelData
  );

  return response.data;
};

export const searchHostelsByCity = async (city) => {
  const response = await api.get(
    `/hostels/search?city=${city}`
  );

  return response.data;
};

