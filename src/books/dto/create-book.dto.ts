import { IsNumber, IsString, IsDate, IsIn, IsDateString, IsNotEmpty } from "class-validator";

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsIn(['lido', 'lendo', 'quero-ler'])
  @IsNotEmpty()
  status: string;

  @IsNumber()
  @IsIn([1, 2, 3, 4, 5])
  @IsNotEmpty()
  avaliation: number;
}
