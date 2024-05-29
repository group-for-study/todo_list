import { useContext, useState, useEffect } from "react";
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
  const [importance, setImportance] = useState<string>("1");
  const [clicked, setClicked] = useState<number>(null);
  const [month, setMonth] = useState<string>(moment(date).format('M'));
  const [year, setYear] = useState<string>(moment(date).format('Y'));

  const [isSearchDate, setIsSearchDate] = useState(false);
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    let date = week[week.length-1][1];
    let newDate = new Date(date.valueOf() + 86400000 * 7);
    let newYear = moment(date).format('Y');
    let newMonth = moment(date).format('M');
    setDate(newDate);
    setYear(newYear);
    setMonth(newMonth);
    async function aa () {
      await getTodoListData(momentFormat(week[0][1]), momentFormat(week[week.length-1][1]));
    }
    aa();
  }, [week]);

  const toggleDropdown = () => {
    setIsSearchDate(!isSearchDate);
  };
  const changeSearchDate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchDate = e.target.value;
    setSearchDate(searchDate);
    const newWeek = makeWeekArr(new Date(searchDate));
    setWeek(newWeek);
  }

  const addTodo = async (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();

    if (todo.trim() === '') {
      return alert('할 일은 반드시 적어야 합니다.');
    }
    const req: PostTodoListBody = {
      isDone: false,
      content: todo,
      importance: parseInt(importance),
      date: selectDay,
    } 

    const res = await API(
      APILIST.postTodoList(req),
    );
    setTodoList((prev: TodoContentType[]) => [...prev, res]);
    setSelectDayTodoList((prev: TodoContentType[]) => [...prev, res]);
    setTodo('');
  };

  const getTodoListData = async (startDate: string, endDate: string) => {
    const data: TodoContentType[] = await API(APILIST.todoList(startDate, endDate)).catch(() => []);
    setTodoList(data);
  };

  const getDayTodoListData = async (startDate: string, endDate: string) => {
    const data: TodoContentType[] = await API(APILIST.todoList(startDate, endDate)).catch(() => []);
    setSelectDayTodoList(data);
  };

  //일주일 전(이전주)
  const onPressArrowLeft = async () => {
    let date = week[0][1];
    let newDate = new Date(date.valueOf() - 86400000 * 7);
    let newWeek = makeWeekArr(newDate);
    let newYear = moment(date).format('Y');
    let newMonth = moment(date).format('M');
    await getTodoListData(newWeek[0][1].toString(), newWeek[newWeek.length-1][1].toString());
    setDate(newDate);
    setWeek(newWeek);
    setYear(newYear);
    setMonth(newMonth);
  };

  //일주일 후(다음주)
  const onPressArrowRight = async () => {
    let date = week[week.length-1][1];
    let newDate = new Date(date.valueOf() + 86400000 * 7);
    let newWeek = makeWeekArr(newDate);
    let newYear = moment(date).format('Y');
    let newMonth = moment(date).format('M');
    await getTodoListData(momentFormat(newWeek[0][1]), momentFormat(newWeek[newWeek.length-1][1]));
    setDate(newDate);
    setWeek(newWeek);
    setYear(newYear);
    setMonth(newMonth);
  };

  //날짜 클릭
  const selectClicktDay = async (date: string, i: number) => {
    const today = momentFormat(date);
    await getDayTodoListData(today, today);
    setSelectDay(date);
    setClicked(i);
  }

  //취소 버튼
  const cancelTodo = () => {
    setSelectDay(null);
  }

  const changeTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const changeImportanceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let importance = parseInt(e.target.value);

    if(importance > 10 || importance <= 0) {
      alert('1점이상 10점 이하로 입력할 수 있습니다.');
      return;
    } else if(importanceRegex(importance)) {
      alert('숫자만 입력 가능합니다.')
      return;
    }

    setImportance(e.target.value);
  };

  return (
    <div>
      <div className={style.year}>
        <ArrowButton color="white" onClick={onPressArrowLeft}/>
        <h4 className={style.month} onClick={toggleDropdown}>
          {`${year}년`} {`${month}월`}
        </h4>
        {isSearchDate && <><input type="date" value={searchDate} onChange={changeSearchDate}/></>}
        <ArrowButton left={false} color="white" onClick={onPressArrowRight}/>
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
          <Input inputType="text" value={todo} onChange={changeTodoInput}/>
          <span>중요도: </span><Input inputType="number" value={importance} onChange={changeImportanceInput}/>
          <Button title="ADD" onClick={addTodo}/>
          <Button title="CANCEL" color="secondary" onClick={cancelTodo}/>
        </div>
      )}
    </div>
  )
}