import { useState, useRef } from "react";
import {Todo} from "./Todo";
import { TodoInput } from "./TodoInput";

export function TodoList() {
  const [todoList, setTodoList] = useState<string[]>([]);

  const todoInputRef = useRef<HTMLInputElement>(null);

  const successTodo = (i: number): void => {
    console.log(`successTodo`);
    const updateTodoList = todoList.filter((_, index: number): boolean => index !== i);
    setTodoList(updateTodoList)
    todoInputRef.current!.focus();
  }

  return (
    <>
      <h3>할일 목록</h3>
      <TodoInput
        setTodoList={setTodoList}
        todoInputRef={todoInputRef}
      />
      {todoList.length > 0 && (
        <ul>
          {todoList.map((todo: string, i: number) => {
            return (
                <Todo
                  key={`할일_${i}`}
                  index={i}
                  todoInfo={todo}
                  button={<div><button onClick={() => successTodo(i)}>완료</button></div>}
                />
              ) 
          })}
        </ul>
      )}
    </>
  );
}