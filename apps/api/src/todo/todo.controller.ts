import { Body, Controller, Delete, Get, Post, Param, Patch } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoListDto } from './todo.dto';
import { ApiResponse } from '@nestjs/swagger';

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
   * todo 수정
   * @param id target ID
   * @returns result
   */
  @Patch(':id')
  async fetchTodoList(@Body() todoContent: CreateTodoListDto, @Param('id') id: string) {
    return this.todoService.editTodo(id, todoContent);
  }

  /**
   * 특정 id의 todo list 삭제
   */
  @Delete(':id')
  async deleteTodoList(@Param('id') id: string) {
    return this.todoService.deleteTodoList(id);
  }
}
