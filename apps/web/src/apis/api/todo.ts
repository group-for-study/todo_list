import { Axios } from "apis/utils/instance";
import { PostTodoData } from "containers/todoList/dto/request/TodoResponse";
import { AxiosResponse } from "axios";
import { GetTodoData } from "containers/todoList/dto/response/TodoRequest";

export const postTodo = async(requestData: PostTodoData) => {
  try {
    const res = await Axios.post('/todo', requestData);
    return res;
  } catch (err) {
    console.log(err);
  }
}

export const getTodos = async(): Promise<AxiosResponse<GetTodoData[]>> => {
  try {
    const res = await Axios.get("/todo")
    return res;
  } catch (err) {
    console.log(err);
  }
}