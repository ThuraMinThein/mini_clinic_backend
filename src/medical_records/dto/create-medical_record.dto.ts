import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateMedicalRecordDto {
  @IsDateString()
  date: Date;

  @IsString()
  @IsNotEmpty()
  diagonsis: string;

  @IsString()
  @IsNotEmpty()
  treatment: string;
}
