import { useState, useEffect } from 'react';
import { Button, Input, TodoContent } from 'assets/common';
import { TodoContentType } from 'assets/types/api';
import { API, APILIST } from 'assets/utils';
import style from './TodoList.module.scss';
import { CustomCalendar } from 'assets/common/calendar/CustomCalendar';

function TodoList() {
  const [todo, setTodo] = useState<string>('');
  const [todoList, setTodoList] = useState<TodoContentType[]>([]);
  const [prevDate, setPrevDate] = useState<string>('');
  const [lastDate, setLastDate] = useState<string>('');

  useEffect(() => {
    getTodoListData();
  }, []);

  const getTodoListData = async () => {
    const data = await API(APILIST.todoList()).catch(() => []);
    setTodoList(data);
  };

  const successTodo = (id: string): void => {
    const updateTodoList = todoList.filter((todo) => todo._id !== id);
    setTodoList(updateTodoList);
  };

  const changeTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('changeTodoInput');
    setTodo(e.target.value);
  };

  const addTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('addTodo');

    if (todo.trim() === '') {
      return alert('할 일은 반드시 적어야 합니다.');
    }
    const res = await API(
      APILIST.postTodoList({
        isDone: false,
        content: todo,
      }),
    );
    setTodoList((prev) => [...prev, res]);
    setTodo('');
  };

  const changePrevDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrevDate(e.target.value)
  }
  const changeLastDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastDate(e.target.value);
  }

  return (
    <section>
      <div className={style.header}>
        <h3>할일 목록</h3>
        <div>
          <CustomCalendar />
        </div>
        <div className={style.inputDate}>
          <Input value={prevDate} onChange={changePrevDate} inputType='date' />
          ~
          <Input value={lastDate} onChange={changeLastDate} inputType='date' />
          <Button title="조회" />
        </div>
        <form onSubmit={addTodo}>
          <Input onChange={changeTodoInput} inputType={"text"}/>
          <Button title="ADD" />
        </form>
      </div>

      {todoList.length > 0 && (
        <ul className={style.list}>
          {todoList.map((todo, i: number) => (
            <li key={`할일_${i}`}>
              <TodoContent label={todo.content} onChange={() => successTodo(todo._id)} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TodoList;
