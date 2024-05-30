export interface TodoContentType {
  isDone: boolean;
  content: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  date: string;
  importance: number;
  __v: number;
}

export interface PostTodoListBody {
  isDone: boolean;
  content: string;
  importance: number;
  date: string;
}
