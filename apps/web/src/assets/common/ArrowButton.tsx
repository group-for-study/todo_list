import style from "./ArrowButton.module.scss";
import { MouseEvent } from 'react';

type Props = {
  onClick?: (e: MouseEvent) => void;
  rounded?: boolean;
  color?: 'secondary' | 'white' | 'default';
  left?: boolean;
};

export function ArrowButton({ onClick, rounded = true, color = 'default', left = true }: Props) {
  return (
    <button
      className={
        `${style.arrowButton}
         ${rounded ? style.round : ''}
         ${style[color]}
         ${left === true ? style.left : style.right}`
      }
      onClick={onClick}
    >
    </button>
  );
}
