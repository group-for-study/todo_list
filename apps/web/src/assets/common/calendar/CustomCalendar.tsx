import { useState } from "react";
import moment from "moment";
import { Input } from "../Input";
import style from "./CustomCalendar.module.scss";
import { Button } from "../Button";

type WeekDay = [number, Date, string];

const makeWeekArr = (date?: Date): WeekDay[] => {
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

export function CustomCalendar() {
  let now = new Date();
  const [date, setDate] = useState<Date>(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
  const [week, setWeek] = useState<WeekDay[]>(makeWeekArr);
  const [selectDay, setSelectDay] = useState<string>(null);

  //일주일 전(이전주)
  const onPressArrowLeft = () => {
    let date = week[0][1];
    let newDate = new Date(date.valueOf() - 86400000 * 7);
    let newWeek = makeWeekArr(newDate);
    setDate(newDate);
    setWeek(newWeek);
  };

  //일주일 후(다음주)
  const onPressArrowRight = () => {
    let date = week[week.length-1][1];
    let newDate = new Date(date.valueOf() + 86400000 * 7);
    let newWeek = makeWeekArr(newDate);
    setDate(newDate);
    setWeek(newWeek);
  };

  //날짜 클릭
  const selectClicktDay = (e: any) => {
    console.log('selecClicktDay');
    console.log(e.target.innerText);
    setSelectDay(e.target.innerText);
  }

  //취소 버튼
  const cancelTodo = () => {
    setSelectDay(null);
  }


  return (
    <div>
      <h4 className={style.month}>
        {`${moment(date).format('Y')}년`} {`${moment(date).format('M')}월`}
      </h4>
      <div className={style.week}>
        {week.map((day: any, i) => (
          <>
            <div className={style.day} key={i} onClick={selectClicktDay}>
              <p>{day[2]}</p>
              <p>{moment(day[1]).format('D')}</p>
              {moment(day[1]).format('YYYY-MM-DD')}
            </div>
          </>
        ))}
      </div>
      <Button title="이전 주" color="white" onClick={onPressArrowLeft}/>
      <Button title="다음 주" color="white" onClick={onPressArrowRight}/>
      { selectDay && (
        <div>
          <span>{selectDay}</span>
          <Input inputType="text" value={selectDay}/>
          <Button title="ADD"/>
          <Button title="CANCEL" color="secondary" onClick={cancelTodo}/>
        </div>
      )}
    </div>
  )
}