import { Transform } from 'class-transformer';
import { IsBoolean, ValidateIf, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

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

  /**
   * 할일을 할 날짜
   */
  @Transform(() => Date)
  public date: Date;
}

export class InquiryTodoListByDateDto {
  @ValidateIf((dto) => dto.startDate || dto.endDate)
  @IsNotEmpty()
  @Transform(() => Date)
  public startDate: Date;

  @ValidateIf((dto) => dto.startDate || dto.endDate)
  @IsNotEmpty()
  @Transform(() => Date)
  public endDate: Date;
}
