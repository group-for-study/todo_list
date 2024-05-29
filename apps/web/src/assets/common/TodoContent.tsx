import { MouseEvent, ReactElement } from 'react';
import style from './TodoContent.module.scss';
import { Button } from './Button';
import { TodoContentType } from 'assets/types/api';

type Props = {
  label: TodoContentType;
  successTodo: (e: MouseEvent) => void;
  updateTodo: (e: MouseEvent) => void;
  isUpdated: number;
  showUpdateForm: (e: MouseEvent) => void;
  index: number;
  updateInput: ReactElement
};

export function TodoContent({ label, successTodo, updateTodo, isUpdated, showUpdateForm, index, updateInput }: Props) {
  return (
    <div className={style.todo_content}>
      <p>{label.content}</p>
      {isUpdated === index && <>{updateInput}</>}
      <p>{label.createdAt.slice(0, 10)}</p>
      <Button color="white" title={'완료'} onClick={successTodo} rounded />
      <Button color="red" title={isUpdated === index ? '취소' : '수정'} onClick={showUpdateForm} rounded />
      {isUpdated === index && <Button color="red" title={"완료"} onClick={updateTodo} />}
    </div>
  );
}
