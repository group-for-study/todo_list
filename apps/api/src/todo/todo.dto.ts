import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoListDto {
  /**
   * 완료상태
   */
  @IsBoolean()
  @IsNotEmpty()
  public isDone: boolean;
  /**
   * 할일 내용
   */
  @IsString()
  public content: string;
}
