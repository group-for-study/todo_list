import { useState, useEffect, createContext } from 'react';
import { Button, Input, TodoContent } from 'assets/common';
import { TodoContentType } from 'assets/types/api';
import { API, APILIST } from 'assets/utils';
import style from './TodoList.module.scss';
import { CustomCalendar, makeWeekArr, momentFormat } from 'assets/common/calendar/CustomCalendar';

export const TodoContext = createContext(null);

function TodoList() {

  const [todo, setTodo] = useState<string>('');
  const [todoList, setTodoList] = useState<TodoContentType[]>([]);
  const [prevDate, setPrevDate] = useState<string>('');
  const [lastDate, setLastDate] = useState<string>('');
  const [selectDayTodoList, setSelectDayTodoList] = useState<TodoContentType[]>([]);
  const [isUpdated, setIsUpdated] = useState<number>(null);
  const [updateInput, setUpdateInput] = useState<string>("");

  useEffect(() => {
    getTodoListData();
  }, []);

  const getTodoListData = async () => {
    const today =  momentFormat(new Date());
    const week = makeWeekArr();
    const startDate = momentFormat(week[0][1]);
    const endDate = momentFormat(week[week.length-1][1]);
    const data: TodoContentType[] = await API(APILIST.todoList(startDate, endDate)).catch(() => []);
    const todayData: TodoContentType[] = await API(APILIST.todoList(today, today)).catch(() => []);
    setTodoList(data);
    setSelectDayTodoList(todayData);
  };

  const successTodo = async (id: string) => {
    const updateselectDayTodoList: TodoContentType[] = selectDayTodoList.filter((todo) => todo._id !== id);
    const updateTodoList: TodoContentType[] = todoList.filter((todo) => todo._id !== id);

    await API(APILIST.deleteTodoList(id)).catch(() => []);
    setSelectDayTodoList(updateselectDayTodoList);
    setTodoList(updateTodoList);
  };
  
  const updateTodo = async (id: string, content: string, isDone?: boolean, importance?: number) => {
    const data = {
      content,
      isDone,
      importance
    }
    await API(APILIST.patchTodoList(id, data)).catch(() => []);;
  
    setSelectDayTodoList((prev) =>
      prev.map((todo) =>
        todo._id === id ? { ...todo, content, isDone, importance } : todo
      )
    );
    setUpdateInput("");
  }

  const showUpdateForm = (i: number): void => {
    if(i===isUpdated) {
      setIsUpdated(null);
      return;
    }

    setIsUpdated(i);
  }
 
  const changePrevDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrevDate(e.target.value)
  }
  const changeLastDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastDate(e.target.value);
  }
  const getSelectDate = async () => {
    const prevDay = parseInt(prevDate.split("-")[2])
    const lastDay = parseInt(lastDate.split("-")[2])
    
    if(prevDay > lastDay || prevDate === "" || lastDate === "") {
      alert('조회 날짜를 다시 확인 해 주세요');
      return;
    }
    if(prevDay + 7 < lastDay) {
      alert('최소 1일 최대 7일 기간으로 조회 가능합니다.');
      return;
    }

    const data: TodoContentType[] = await API(APILIST.todoList(prevDate, lastDate)).catch(() => []);
    setTodoList(data);
    setSelectDayTodoList(data);
  }

  return (
    <TodoContext.Provider value={{todo, setTodo, todoList, setTodoList, setSelectDayTodoList}}>
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
            <Button title="조회" onClick={getSelectDate}/>
          </div>
        </div>
        {
          selectDayTodoList.length > 0 && (
            <ul className={style.list}>
              {selectDayTodoList.map((todo, i: number) => (
                <li key={`할일_${i}`}>
                  <TodoContent
                    label={todo}
                    isUpdated={isUpdated}
                    index={i}
                    successTodo={() => successTodo(todo._id)}
                    updateTodo={() => updateTodo(todo._id, updateInput, todo.isDone, todo.importance)}
                    showUpdateForm={() => showUpdateForm(i)}
                    updateInput={
                      <Input value={updateInput} inputType='text' onChange={(e) => setUpdateInput(e.target.value)}/>
                    }
                  />
                </li>
              ))}
            </ul>
            )
             }
      </section>
    </TodoContext.Provider>
  );
}

export default TodoList;
