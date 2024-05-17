import { InternalAxiosRequestConfig } from "axios";

export const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const { method, url } = config;
  console.log(`📣 [API - REQUEST] ${method?.toUpperCase()} ${url}`);

  return config;
};