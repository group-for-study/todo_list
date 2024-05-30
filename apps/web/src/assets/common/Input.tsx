import { ChangeEvent, forwardRef } from 'react';
import style from './Input.module.scss';

type Props = {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  inputType: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(({ onChange, value, inputType }) => {

  return (
    <input
      className={style.input}
      type={inputType}
      value={value}
      onChange={(e) => onChange(e)}
      maxLength={100}
    />
  );
});

Input.displayName = 'Input';
