import axios from "axios";
import { onRequest } from "./onRequest";
import { onResponse } from "./onResponse";
import { onError } from "./onError";

export const Axios = axios.create({
  baseURL: "http://localhost:3001",
  headers: { "Content-Type": "application/json" },
})

Axios.interceptors.request.use(onRequest)
Axios.interceptors.response.use(
  onResponse,
  onError,
)