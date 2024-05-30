import { useContext, useState } from "react";
import moment from "moment";
import { Input } from "../Input";
import style from "./CustomCalendar.module.scss";
import { Button } from "../Button";
import { TodoContext } from "containers/todoList/TodoList";
import { APILIST, API } from "assets/utils";
import { PostTodoListBody, TodoContentType } from "assets/types/api";
import { Day } from "./Day";
import { ArrowButton } from "../ArrowButton";

export type WeekDay = [number, Date, string];

export const momentFormat = (date: Date | string) => {
  return moment(date).format('YYYY-MM-DD');
}

export const makeWeekArr = (date?: Date): WeekDay[] => {
  let now: Date = date === undefined ? new Date() : date;
  let strWeak = ["일", "월", "화", "수", "목", "금", "토"];
  let day = now.getDay();
  let week: WeekDay[] = [];
  for (let i = 0; i < 7; i++) {
    let newDate = new Date(now.valueOf() + 86400000 * (i - day));
    week.push([i, newDate, strWeak[newDate.getDay()]]);
  }
  return week;
};

const importanceRegex = (importance: number) => {
  const imp = importance.toString();
  const impRegex = /^[0-9]*$/; // 숫자만 체크
  if(impRegex.test(imp)){
      return false;
  }else{
      return true;
  }
}

export function CustomCalendar() {
  const {todo, setTodo, setTodoList, setSelectDayTodoList} = useContext(TodoContext);
  let now = new Date();
  const [date, setDate] = useState<Date>(now);
  const [week, setWeek] = useState<WeekDay[]>(() => makeWeekArr(now));
  const [selectDay, setSelectDay] = useState<string>(null);
  const [importance, setImportance] = useState<number>(1);
  const [clicked, setClicked] = useState<number>(null);
  const [month, setMonth] = useState<string>(moment(date).format('M'));
  const [year, setYear] = useState<string>(moment(date).format('Y'));

  const [isSearchDate, setIsSearchDate] = useState(false);
  const [searchDate, setSearchDate] = useState('');

  const changeSearchDate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchDate = e.target.value;
    const newWeek = makeWeekArr(new Date(searchDate));
    setSearchDate(searchDate);
    setWeek(newWeek);
  }

  const addTodo = async () => {
    if (todo.trim() === '') {
      return alert('할 일은 반드시 적어야 합니다.');
    }

    const req: PostTodoListBody = {
      isDone: false,
      content: todo,
      importance: importance,
      date: selectDay,
    } 

    const res = await API(APILIST.postTodoList(req));
    setTodoList((prev: TodoContentType[]) => [...prev, res]);
    setSelectDayTodoList((prev: TodoContentType[]) => [...prev, res]);
    setTodo('');
  };

  const getTodoListData = async (startDate: string, endDate: string) => {
    const data: TodoContentType[] = await API(APILIST.todoList(startDate, endDate)).catch(() => []);
    setTodoList(data);
  };

  const getTodoListDayData = async (startDate: string, endDate: string) => {
    const data: TodoContentType[] = await API(APILIST.todoList(startDate, endDate)).catch(() => []);
    setSelectDayTodoList(data);
  };

  const getWeekData = async (date: Date, newDate: Date) => {
    const newWeek = makeWeekArr(newDate);
    const newYear = moment(date).format('Y');
    const newMonth = moment(date).format('M');
    await getTodoListData(momentFormat(newWeek[0][1]), momentFormat(newWeek[newWeek.length-1][1]));
    setDate(newDate);
    setWeek(newWeek);
    setYear(newYear);
    setMonth(newMonth);
  };

  //일주일 전(이전주)
  const clickPrevWeek = async () => {
    const date = week[0][1];
    const newDate = new Date(date.valueOf() - 86400000 * 7);
    await getWeekData(date, newDate);
  };

  //일주일 후(다음주)
  const clickNextWeek = async () => {
    const date = week[week.length-1][1];
    const newDate = new Date(date.valueOf() + 86400000 * 7);
    await getWeekData(date, newDate);
  };

  //날짜 클릭
  const selectClicktDay = async (date: string, i: number) => {
    const today = momentFormat(date);
    await getTodoListDayData(today, today);
    setSelectDay(date);
    setClicked(i);
  }

  const changeImportanceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const importance = parseInt(e.target.value);

    if(importance > 10 || importance <= 0) {
      return alert('1점이상 10점 이하로 입력할 수 있습니다.');
    } else if(importanceRegex(importance)) {
      return alert('숫자만 입력 가능합니다.')
    }

    setImportance(importance);
  };

    //취소 버튼
  // const cancelTodo = () => {
  //   setSelectDay(null);
  // }

  // const changeTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setTodo(e.target.value);
  // };

  //날짜 클릭 시 날짜 선택하는 input 나오는 기능
  // const clickSelectDate = () => {
  //   setIsSearchDate(!isSearchDate);
  // };

  return (
    <div>
      <div className={style.year}>
        <ArrowButton color="white" onClick={clickPrevWeek}/>
        <h4 className={style.month} onClick={() => setIsSearchDate(!isSearchDate)}>
          {`${year}년`} {`${month}월`}
        </h4>
        {isSearchDate && <><input type="date" value={searchDate} onChange={changeSearchDate}/></>}
        <ArrowButton left={false} color="white" onClick={clickNextWeek}/>
      </div>
      <div className={style.week}>
        {
          week.map((day: WeekDay, i) => {
          const selectDate = momentFormat(day[1]);
          return (
            <>
              <Day day={day} clicked={clicked} i={i} onClick={() => selectClicktDay(selectDate, i)}/>
            </>
          )
        })}
      </div>
      { selectDay && (
        <div>
          <span>{selectDay}</span>
          <Input inputType="text" value={todo} onChange={(e) => setTodo(e.target.value)}/>
          <span>중요도: </span><Input inputType="number" value={String(importance)} onChange={changeImportanceInput}/>
          <Button title="ADD" onClick={addTodo}/>
          <Button title="CANCEL" color="secondary" onClick={() => {setSelectDay(null); setClicked(null)}}/>
        </div>
      )}
    </div>
  )
}