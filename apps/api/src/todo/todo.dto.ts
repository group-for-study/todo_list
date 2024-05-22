import { IsBoolean, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

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
  /**
   * 중요도
   */
  @IsInt()
  @Min(1)
  @Max(10)
  public importance: number;
}
