import React, { useState, useRef, useEffect } from "react";
import Todo from "./Todo";

function TodoList() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isTodo, setIsTodo] = useState(false);

  const todoInputRef = useRef(null);

  useEffect(() => {
    if(todoList.length !== 0) {
      setIsTodo(true);
    }
    
    return () => {
      if(todoList.length > 0) {
        setIsTodo(true);
      } else {
        setIsTodo(false);
      }
    }
  }, [todoList])

  const successTodo = (successTodo) => {
    console.log(`successTodo : ${successTodo}`);
    const updateTodoList = todoList.filter((todo) => todo !== successTodo);
    setTodoList(updateTodoList)
  }

  const handleTodoOnChange = (e) => {
    console.log("handleTodoOnChange");
    setTodo(e.target.value);
  };

  const handleOnTodoSubmit = (e) => {
    e.preventDefault();
    console.log("handleOnTodoSubmit");
    todoInputRef.current.focus();
    setTodo("");
    setTodoList((prevTodoList) => {
      return [...prevTodoList, todo];
    });
  };

  return (
    <>
      <h3>할일 목록</h3>
      <form onSubmit={handleOnTodoSubmit}>
        <input
          ref={todoInputRef}
          type="text"
          value={todo}
          onChange={handleTodoOnChange}
          maxLength={100}
        />
        <button>추가</button>
      </form>
      {isTodo && (
        <ul>
          {todoList.map((todo, i) => {
            return (
                <Todo
                  key={`할일_${i}`}
                  todoInfo={todo}
                  successTodo={successTodo}
                />
              ) 
          })}
        </ul>
      )}
    </>
  );
}

export default TodoList;
