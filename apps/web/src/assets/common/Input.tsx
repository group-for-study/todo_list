import { ChangeEvent, forwardRef } from 'react';
import style from './Input.module.scss';

type Props = {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(({ onChange, value }, ref) => {
  return (
    <input
      className={style.input}
      ref={ref}
      type="text"
      value={value}
      onChange={(e) => onChange(e)}
      maxLength={100}
    />
  );
});

Input.displayName = 'Input';
