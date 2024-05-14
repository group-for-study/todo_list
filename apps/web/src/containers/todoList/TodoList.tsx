import { useState, useRef } from 'react';
import { TodoContent } from 'assets/common/TodoContent';
import style from './TodoList.module.scss';
import { Button, Input } from 'assets/common';

function TodoList() {
  const [todo, setTodo] = useState<string>('');
  const [todoList, setTodoList] = useState<string[]>([]);

  const todoInputRef = useRef<HTMLInputElement>(null);

  const successTodo = (successTodo: string): void => {
    console.log(`successTodo : ${successTodo}`);
    const updateTodoList = todoList.filter((todo: string): boolean => todo !== successTodo);
    setTodoList(updateTodoList);
  };

  const handleTodoOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleTodoOnChange');
    setTodo(e.target.value);
  };

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('addTodo');
    if (todo.trim() === '') {
      alert('할 일은 반드시 적어야 합니다.');
    } else {
      setTodo('');
      setTodoList((prevTodoList: string[]): string[] => {
        return [...prevTodoList, todo];
      });
    }
    todoInputRef.current!.focus();
  };

  return (
    <section>
      <div className={style.header}>
        <h3>할일 목록</h3>
        <form onSubmit={addTodo}>
          <Input ref={todoInputRef} onChange={handleTodoOnChange} />
          <Button title="ADD" />
        </form>
      </div>

      {todoList.length > 0 && (
        <ul className={style.list}>
          {todoList.map((todo: string, i: number) => (
            <li key={`할일_${i}`}>
              <TodoContent label={todo} onChange={() => successTodo(todo)} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TodoList;
