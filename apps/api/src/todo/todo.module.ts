import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoContent, TodoListSchema } from './todo.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: TodoContent.name, schema: TodoListSchema }])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
