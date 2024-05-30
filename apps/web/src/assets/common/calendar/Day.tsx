import moment from "moment";
import { TodoContentType } from "assets/types/api";
import { WeekDay, momentFormat } from "./CustomCalendar";
import { TodoContext } from "containers/todoList/TodoList";
import { useContext, useEffect, useState } from "react";
import style from "./CustomCalendar.module.scss";

interface Props {
  day: WeekDay,
  clicked: number,
  i: number,
  onClick: (date: string, i: number) => void,
}

export function Day ({ day, clicked, i, onClick }: Props) {
  const { todoList, selectDayTodoList } = useContext(TodoContext);
  
  const selectDate = momentFormat(day[1]);
  const findTodo = todoList.find((todo: TodoContentType) => moment(todo.date).format('YYYY-MM-DD') === moment(day[1]).format('YYYY-MM-DD'));
  const [checkTodo, setCheckTodo] = useState<boolean>(findTodo);
  
  useEffect(() => {
    if(findTodo) {
      setCheckTodo(true);
      return;
    }
    setCheckTodo(false);
  }, [selectDayTodoList]);
  
  const dayInfo = day[1];
  const weekInfo = day[2];
  const today = momentFormat(dayInfo) === momentFormat(new Date())
  return (
    <div className={style.dayContent}>
      {
        
        <div className={clicked === i ? style.clicked : style.day} key={i} onClick={() => onClick(selectDate, i)}>
        <p>{weekInfo}</p>
        <p>{moment(dayInfo).format('D')}</p>
        {today && <span className={style.today}>Today</span>}
        {checkTodo && <span>📝</span>}
        </div>
      }
    </div>
  )
}