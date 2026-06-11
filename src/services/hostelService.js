import api from "../api/axios";

// Get all hostels
export const getAllHostels = async () => {
  const response = await api.get("/hostels");
  return response.data;
};

// Get paginated hostels
export const getHostelsPaged = async (
  page = 0,
  size = 5
) => {
  const response = await api.get(
    `/hostels/paged?page=${page}&size=${size}`
  );

  return response.data;
};

// Create hostel
export const createHostel = async (hostelData) => {
  const response = await api.post(
    "/hostels",
    hostelData
  );

  return response.data;
};

// Update hostel
export const updateHostel = async (
  hostelId,
  hostelData
) => {
  const response = await api.put(
    `/hostels/${hostelId}`,
    hostelData
  );

  return response.data;
};

// Delete hostel
export const deleteHostel = async (hostelId) => {
  const response = await api.delete(
    `/hostels/${hostelId}`
  );

  return response.data;
};

// Search hostels by city
export const searchHostelsByCity = async (city) => {
  const response = await api.get(
    `/hostels/search?city=${city}`
  );

  return response.data;
};