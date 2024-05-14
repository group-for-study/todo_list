import { MouseEvent } from 'react';
import style from './TodoContent.module.scss';
import { Button } from './Button';

type Props = {
  label: string;
  onChange: (e: MouseEvent) => void;
};

export function TodoContent({ label, onChange }: Props) {
  return (
    <div className={style.todo_content}>
      <p>{label}</p>
      <Button color="white" title={'완료'} onClick={(e) => onChange(e)} rounded />
    </div>
  );
}
