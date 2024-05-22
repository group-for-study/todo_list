import { Body, Controller, Delete, Get, Post, Param, Patch } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoListDto, InquiryTodoListByDateDto } from './todo.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  /**
   * Body에 startDate,endDate가 있을 때만 특정 날짜 조회 없으면 전체 목록 조회
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
            importance: 1,
            date: '2024-05-13T00:00:00Z',
            createdAt: '2024-05-13T12:33:02.753Z',
            updatedAt: '2024-05-13T12:33:02.753Z',
            __v: 0,
          },
        ],
      },
    },
  })
  @Get()
  getTodoList(@Body() inquiryTodoListByDateDto: InquiryTodoListByDateDto) {
    if (inquiryTodoListByDateDto.hasOwnProperty('startDate')) {
      return this.todoService.getPeriod(inquiryTodoListByDateDto);
    }
    return this.todoService.getAll();
  }

  /**
   * todo list 생성
   */
  @Post()
  createTodoList(@Body() createTodoListDto: CreateTodoListDto) {
    return this.todoService.create(createTodoListDto);
  }

  /**
   * todo 수정
   * @param id target ID
   * @returns result
   */
  @Patch(':id')
  fetchTodoList(@Body() todoContent: CreateTodoListDto, @Param('id') id: string) {
    return this.todoService.editTodo(id, todoContent);
  }

  /**
   * 특정 id의 todo list 삭제
   */
  @Delete(':id')
  deleteTodoList(@Param('id') id: string) {
    return this.todoService.deleteTodoList(id);
  }
}
