import axios from "axios";

export function getApiBaseUrl() {
  return process.env.API_URL || process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";
}

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
