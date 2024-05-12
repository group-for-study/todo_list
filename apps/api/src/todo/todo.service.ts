import { Injectable } from '@nestjs/common';
import { TodoList } from './todo.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoListDto } from './todo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(TodoList.name) private todoModel: Model<TodoList>) {}
  async create(createTodoListDto: CreateTodoListDto): Promise<TodoList> {
    const createTodoList = new this.todoModel(createTodoListDto);
    return createTodoList.save();
  }

  async getAll(): Promise<TodoList[]> {
    return this.todoModel.find().exec();
  }

  async deleteTodoList(id: string) {
    return this.todoModel.deleteOne({ _id: id });
  }
}
