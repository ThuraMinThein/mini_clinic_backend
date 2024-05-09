import { IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @IsDateString()
  dateAndTime: Date;
}
