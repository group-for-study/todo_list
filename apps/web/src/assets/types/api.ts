export interface TodoContentType {
  isDone: boolean;
  content: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PostTodoListBody {
  isDone: boolean;
  content: string;
}
