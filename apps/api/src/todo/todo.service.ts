import { Injectable } from '@nestjs/common';
import { TodoContent } from './todo.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoListDto } from './todo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(TodoContent.name) private todoModel: Model<TodoContent>) {}
  async create(createTodoListDto: CreateTodoListDto): Promise<TodoContent> {
    const createTodoList = new this.todoModel(createTodoListDto);
    return createTodoList.save();
  }

  getAll() {
    return this.todoModel.find();
  }

  editTodo(id: string, todoContent: CreateTodoListDto) {
    return this.todoModel.updateOne({ _id: id }, { $set: todoContent });
  }

  deleteTodoList(id: string) {
    return this.todoModel.deleteOne({ _id: id });
  }
}
