import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  speciality: string;

  @IsString()
  @IsNotEmpty()
  contactInfo: string;
}
