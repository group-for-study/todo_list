import { instance } from "apis/utils/instance";

interface postTodoData {
  content: string;
}

export const postTodo = async({content}: postTodoData) => {
  await instance.post('/todo', {content})
    .then((res) => {
      if(res.status === 201) {
        console.log('성공')
      }
    })
    .catch((err) => {
      console.log(err);
    });
  
}

export const getTodos = async() => {
  await instance.get('/todo')
    .then((res) => {
      return res.data;
    })
}