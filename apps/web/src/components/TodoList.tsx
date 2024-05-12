import React, { useState, useRef, useEffect } from "react";
import {Todo} from "./Todo";

function TodoList() {
  const [todo, setTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<string[]>([]);

  const todoInputRef = useRef<HTMLInputElement>(null);

  const successTodo = (successTodo: string): void => {
    console.log(`successTodo : ${successTodo}`);
    const updateTodoList = todoList.filter((todo: string): boolean => todo !== successTodo);
    setTodoList(updateTodoList)
  }

  const handleTodoOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleTodoOnChange");
    setTodo(e.target.value);
  };

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("addTodo");
    if(todo.trim()==="") {
      alert("할 일은 반드시 적어야 합니다.");
    } else {
      setTodo("");
      setTodoList((prevTodoList: string[]): string[] => {
        return [...prevTodoList, todo];
      });
    }
    todoInputRef.current!.focus();
  };

  return (
    <>
      <h3>할일 목록</h3>
      <form onSubmit={addTodo}>
        <input
          ref={todoInputRef}
          type="text"
          value={todo}
          onChange={handleTodoOnChange}
          maxLength={100}
        />
        <button>추가</button>
      </form>
      {todoList.length > 0 && (
        <ul>
          {todoList.map((todo: string, i: number) => {
            return (
                <Todo
                  key={`할일_${i}`}
                  index={i}
                  todoInfo={todo}
                  button={<div><button onClick={() => successTodo(todo)}>완료</button></div>}
                />
              ) 
          })}
        </ul>
      )}
    </>
  );
}

export default TodoList;
