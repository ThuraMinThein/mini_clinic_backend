import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMedicalRecordDto {
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  patientId: number;

  @IsNotEmpty()
  @IsNumber()
  doctorId: number;

  @IsString()
  @IsNotEmpty()
  diagonsis: string;

  @IsString()
  @IsNotEmpty()
  treatment: string;
}
