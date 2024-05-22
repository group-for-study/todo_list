import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type TodoListDoc = HydratedDocument<TodoContent>;

@Schema({ timestamps: true })
export class TodoContent {
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
  @Prop({ required: true })
  public content: string;

  /**
   * 할일 컨텐츠 중요도
   * 1~10까지 입력가능
   * 숫자가 높을 수록 중요도가 높음
   */
  @Prop({ required: true })
  public importance: number;

  /**
   * 할일을 할 날짜
   */
  @Prop({ required: true })
  public date: Date;
}

export const TodoListSchema = SchemaFactory.createForClass(TodoContent);
export const TodoListModel = mongoose.model('todoListModel', TodoListSchema);
