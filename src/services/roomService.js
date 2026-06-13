import api from "../api/axios";

// Get all rooms
export const getAllRooms = async () => {
  const response = await api.get("/rooms");
  return response.data;
};

// Create room
export const createRoom = async (roomData) => {
  const response = await api.post("/rooms", roomData);
  return response.data;
};

// Update room
export const updateRoom = async (roomId, roomData) => {
  const response = await api.put(
    `/rooms/${roomId}`,
    roomData
  );

  return response.data;
};

// Delete room
export const deleteRoom = async (roomId) => {
  const response = await api.delete(
    `/rooms/${roomId}`
  );

  return response.data;
};