import React from 'react';

interface TodoProps {
  todoInfo: string;
  index: number;
  button: React.ReactNode;
}

export function Todo({ todoInfo, button }: TodoProps) {
  return (
    <li>
      <div>{todoInfo}</div>
      {button && button}
    </li>
  );
}

// Todo.displayName = 'Todo';
