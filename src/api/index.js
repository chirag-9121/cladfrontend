import { validateAndSendResponse } from "../lib/utils";

// All API call handlers for CRUD operations
export const getAllNodes = async () => {
  const response = await fetch(process.env.REACT_APP_API_BASE_URL);
  return validateAndSendResponse(response, "Failed to fetch nodes");
};

export const getNodeById = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${id}/`);
  return validateAndSendResponse(response, "Failed to fetch nodes");
};

export const addNode = async (data) => {
  const response = await fetch(process.env.REACT_APP_API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return validateAndSendResponse(response, "Failed to add node");
};

export const updateNode = async (id, data) => {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return validateAndSendResponse(response, "Failed to update node");
};

export const deleteNode = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${id}/`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete node");
};
