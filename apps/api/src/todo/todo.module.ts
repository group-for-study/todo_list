import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoList, TodoListSchema } from './todo.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: TodoList.name, schema: TodoListSchema }])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
