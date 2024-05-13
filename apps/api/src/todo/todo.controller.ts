import { Body, Controller, Delete, Get, Post, Param } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoListDto } from './todo.dto';
import { ApiCreatedResponse, ApiProperty, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { TodoList, TodoListSchema, TodoListModel } from './todo.schema';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  /**
   * 전체 todo list 불러오기
   */
  @ApiResponse({
    status: 200,
    content: {
      'application/json': {
        example: [
          {
            _id: '213',
            isDone: false,
            content: '안녕하세요',
            createdAt: '2024-05-13T12:33:02.753Z',
            updatedAt: '2024-05-13T12:33:02.753Z',
            __v: 0,
          },
        ],
      },
    },
  })
  @Get()
  async getTodoList() {
    return await this.todoService.getAll();
  }

  /**
   * todo list 생성
   */
  @Post()
  async createTodoList(@Body() createTodoListDto: CreateTodoListDto) {
    return this.todoService.create(createTodoListDto);
  }

  /**
   * 특정 id의 todo list 삭제
   */
  @Delete(':id')
  async deleteTodoList(@Param('id') id: string) {
    return this.todoService.deleteTodoList(id);
  }
}
