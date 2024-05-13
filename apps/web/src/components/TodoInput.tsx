import React, {useState, Dispatch, SetStateAction, RefObject} from 'react';

interface TodoInputProps {
  setTodoList: Dispatch<SetStateAction<string[]>>;
  todoInputRef: RefObject<HTMLInputElement>;
}

export function TodoInput({setTodoList, todoInputRef}: TodoInputProps) {
  const [todo, setTodo] = useState<string>("");

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
  );
}