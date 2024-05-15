import { instance } from "apis/utils/instance";
import { PostTodoData } from "containers/todoList/dto/request/TodoResponse";

export const postTodo = async(requestData: PostTodoData) => {
  try {
    const res = await instance.post('/todo', requestData);
    return res;
  } catch (err) {
    console.log(err);
  }
}

export const getTodos = async() => {
  try {
    const res = await instance.get("/todo")
    return res;
  } catch (err) {
    console.log(err);
  }
}