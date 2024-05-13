import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type TodoListDoc = HydratedDocument<TodoList>;

@Schema({ timestamps: true })
export class TodoList {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  public id: ObjectId;

  /**
   * 완료상태
   */
  @Prop({ type: Boolean, required: true })
  public isDone: boolean;
  /**
   * 할일 내용
   */
  @Prop()
  public content: string;
}

export const TodoListSchema = SchemaFactory.createForClass(TodoList);
export const TodoListModel = mongoose.model('todoListModel', TodoListSchema);
