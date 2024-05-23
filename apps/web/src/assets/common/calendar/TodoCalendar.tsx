import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import style from "./TodoCalendar.module.scss";
import "./TodoCalendar.scss";
import moment from "moment";
import { TodoContentType } from "assets/types/api";

type Props = {
  todos: TodoContentType[]
}

export function TodoCalendar({todos}: Props) {
  // const [value, setValue] = useState(new Date());
  const today = new Date();
  const [date, setDate] = useState(today);


  //날짜 클릭했을 때 데이터 조회 및 투두 입력 창 나타나도록 구현 예정
  const handleTodayClick = () => {
    console.log('handleTodayClick');
    console.log(date);
    const today = new Date();
    setDate(today);
  };

  const addTodo = ({date}: any) => {
    const todoList = [];
    console.log('addTodo');
    // date(각 날짜)가  리스트의 날짜와 일치하면 해당 컨텐츠(이모티콘) 추가
    if (todos.find(({createdAt}) => moment(createdAt).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD'))) {
      todoList.push(
        <>
          📝
        </>
      );
    }
    return <div>{todoList}</div>; // 각 날짜마다 해당 요소가 들어감
  };

  return (
    <div className={style.calendar}>
      <Calendar
        onChange={handleTodayClick}
        value={today}
        formatDay={(locale, date) => moment(date).format('D')} // 일 제거 숫자만 보이게
        calendarType="gregory" // 일요일 부터 시작
        showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
        next2Label={null} // +1년 & +10년 이동 버튼 숨기기
        prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
        minDetail="year" // 10년단위 년도 숨기기
        tileContent={(date) => addTodo(date)}
      />
    </div>
  )
}