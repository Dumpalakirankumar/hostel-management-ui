import api from "../api/axios";

// Get all payments
export const getAllPayments = async () => {
  const response = await api.get("/payments");
  return response.data;
};

// Create payment
export const createPayment = async (paymentData) => {
  const response = await api.post(
    "/payments",
    paymentData
  );

  return response.data;
};

// Update payment
export const updatePayment = async (
  paymentId,
  paymentData
) => {
  const response = await api.put(
    `/payments/${paymentId}`,
    paymentData
  );

  return response.data;
};

// Delete payment
export const deletePayment = async (
  paymentId
) => {
  const response = await api.delete(
    `/payments/${paymentId}`
  );

  return response.data;
};