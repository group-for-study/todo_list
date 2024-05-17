import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const onError = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { method, url } = error.config as InternalAxiosRequestConfig;
    if (error.response) {
      const { statusCode, message } = error.response.data;
      console.log(
        `❌ [API - ERROR] ${method?.toUpperCase()} ${url} | ${statusCode} : ${message}`,
      );
    }
  } else {
    console.log(`❌ [API] | Error ${error.message}`);
  }
  return Promise.reject(error);
};