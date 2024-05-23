import { TodoContentType } from 'assets/types/api';
import axios, { InternalAxiosRequestConfig } from 'axios';

export const Axios = axios.create({
  baseURL: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
});

export const APILIST = {
  todoList: () => Axios.get<Array<TodoContentType>>('/todo').then((res) => res.data),
  deleteTodoList: (id: string) =>
    Axios.delete<{ acknowledged: boolean; deletedCount: number }>(`/todo/${id}`).then(
      (res) => res.data,
    ),
  postTodoList: (data: { isDone: boolean; content: string }) =>
    Axios.post<TodoContentType>('/todo', data).then((res) => res.data),
};

export const API = <T extends Promise<any>>(target: T): ReturnType<() => Promise<T>> => {
  return target.catch((error) => {
    if (axios.isAxiosError(error)) {
      const { method, url } = error.config as InternalAxiosRequestConfig;
      if (error.response) {
        const { statusCode, message } = error.response.data;
        console.log(
          `❌ [API - ERROR] ${method?.toUpperCase()} ${url} | ${statusCode} : ${message}`,
        );
      }
      console.log(`❌ [API] | Error ${error.message}`);
      return Promise.reject(error);
    }
  });
};
