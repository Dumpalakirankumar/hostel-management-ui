import api from "../api/axios";

// Get all beds
export const getAllBeds = async () => {
  const response = await api.get("/beds");
  return response.data;
};

// Create bed
export const createBed = async (bedData) => {
  const response = await api.post("/beds", bedData);
  return response.data;
};

// Update bed
export const updateBed = async (bedId, bedData) => {
  const response = await api.put(
    `/beds/${bedId}`,
    bedData
  );

  return response.data;
};

// Delete bed
export const deleteBed = async (bedId) => {
  const response = await api.delete(
    `/beds/${bedId}`
  );

  return response.data;
};