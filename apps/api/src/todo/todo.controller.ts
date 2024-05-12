import { Body, Controller, Delete, Get, Post, Param } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoListDto } from './todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodoList() {
    return await this.todoService.getAll();
  }

  @Post()
  async createTodoList(@Body() createTodoListDto: CreateTodoListDto) {
    return this.todoService.create(createTodoListDto);
  }

  @Delete(':id')
  async deleteTodoList(@Param('id') id: string) {
    return this.todoService.deleteTodoList(id);
  }
}
