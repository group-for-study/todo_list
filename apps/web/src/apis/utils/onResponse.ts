import { AxiosResponse } from "axios";

export const onResponse = (res: AxiosResponse): AxiosResponse => {
  const { method, url } = res.config;
  const { status, statusText } = res;
  if (status === 200 || status === 201) {
    console.log(
      `✅ [API - RESPONSE] ${method?.toUpperCase()} ${url} | ${status} : ${statusText}`,
    );
  } else {
    console.log(
      `❌ [API - ERROR] ${method?.toUpperCase()} ${url} | ${status} : ${statusText}`,
    );
  }

  return res;
};