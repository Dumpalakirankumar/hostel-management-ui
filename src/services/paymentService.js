import api from "../api/axios";

export const getAllPayments = async () => {
  const response = await api.get("/payments");
  return response.data;
};

export const createPayment = async (paymentData) => {
  const response = await api.post(
    "/payments",
    paymentData
  );

  return response.data;
};