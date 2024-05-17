import { useState, useRef, useEffect } from 'react';
import { TodoContent } from 'assets/common/TodoContent';
import style from './TodoList.module.scss';
import { Button, Input } from 'assets/common';
import { postTodo, getTodos } from 'apis/api/todo';
import { GetTodoData } from './dto/response/TodoRequest';
import { PostTodoData } from './dto/request/TodoResponse';
import { AxiosResponse } from 'axios';

function TodoList() {
  const [todo, setTodo] = useState<string>('');
  const [todoList, setTodoList] = useState<GetTodoData[]>([]);

  const todoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function getTodoData () {
      const res: AxiosResponse<GetTodoData[]>  = await getTodos();
      setTodoList(res.data);
    }
    getTodoData();
  }, [])

  const successTodo = (id: string): void => {
    console.log(`successTodo : ${successTodo}`);
    const updateTodoList = todoList.filter((todo: GetTodoData): boolean => todo.id !== id);
    setTodoList(updateTodoList);
  };

  const changeTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('changeTodoInput');
    setTodo(e.target.value);
  };

  const addTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('addTodo');
    if (todo.trim() !== '') {
      const requestTodo: PostTodoData= {
        isDone: false,
        content: todo,
      }
      await postTodo(requestTodo)
        .then(({data}) => {
          setTodoList((prevTodoList: GetTodoData[]): GetTodoData[] => {
            return [...prevTodoList, data];
          });
        });
      setTodo('');  
    }
    
    alert('할 일은 반드시 적어야 합니다.');
  };

  return (
    <section>
      <div className={style.header}>
        <h3>할일 목록</h3>
        <form onSubmit={addTodo}>
          <Input ref={todoInputRef} onChange={changeTodoInput} />
          <Button title="ADD" />
        </form>
      </div>

      {todoList.length > 0 && (
        <ul className={style.list}>
          {todoList.map((todo: GetTodoData, i: number) => (
            <li key={`할일_${i}`}>
              <TodoContent label={todo.content} onChange={() => successTodo(todo.id)} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TodoList;
