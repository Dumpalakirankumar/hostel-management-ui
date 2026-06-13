import api from "../api/axios";

// Get all residents
export const getAllResidents = async () => {
  const response = await api.get("/residents");
  return response.data;
};

// Create resident
export const createResident = async (residentData) => {
  const response = await api.post(
    "/residents",
    residentData
  );

  return response.data;
};

// Update resident
export const updateResident = async (
  residentId,
  residentData
) => {
  const response = await api.put(
    `/residents/${residentId}`,
    residentData
  );

  return response.data;
};

// Delete resident
export const deleteResident = async (
  residentId
) => {
  const response = await api.delete(
    `/residents/${residentId}`
  );

  return response.data;
};