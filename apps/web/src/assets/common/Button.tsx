import style from './Button.module.scss';
import { MouseEvent } from 'react';

type Props = {
  title: string;
  onClick?: (e: MouseEvent) => void;
  rounded?: boolean;
  color?: 'secondary' | 'white' | 'default';
};

export function Button({ title, onClick, rounded = false, color = 'default' }: Props) {
  return (
    <button
      className={`${style.button} ${rounded ? style.round : ''} ${style[color]}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
