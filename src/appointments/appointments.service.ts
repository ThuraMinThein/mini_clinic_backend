import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { DoctorsService } from 'src/doctors/doctors.service';
import { PatientsService } from 'src/patients/patients.service';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    private doctorsService: DoctorsService,
    private patientsService: PatientsService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    //checking if the doctor and patient exist
    await this.doctorsService.findOne(createAppointmentDto.doctorId);
    await this.patientsService.findOne(createAppointmentDto.patientId);

    //creating the new appintment
    const appointment =
      this.appointmentsRepository.create(createAppointmentDto);
    return this.appointmentsRepository.save(appointment);
  }

  findAll() {
    return this.appointmentsRepository.find({
      relations: ['doctor', 'patient'],
    });
  }

  async findOne(id: number) {
    //find the appointment by id
    const appointment = await this.appointmentsRepository.findOne({
      where: {
        appointmentId: id,
      },
      relations: ['doctor', 'patient'],
    });
    //if there is no appointment throw an error
    if (!appointment) throw new NotFoundException('Appointment not found');
    return appointment;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    //checking if the appointment's id exists
    const appointment = await this.findOne(id);

    //if the user try to update the doctor's id, check if the id exists
    let doctor = appointment.doctor;
    if (updateAppointmentDto?.doctorId) {
      doctor = await this.doctorsService.findOne(
        updateAppointmentDto?.doctorId,
      );
    }

    //if the user try to update the patient's id, check if the id exists
    let patient = appointment.patient;
    if (updateAppointmentDto?.patientId) {
      patient = await this.patientsService.findOne(
        updateAppointmentDto?.patientId,
      );
    }

    //update the appointment
    const updatedAppointment = this.appointmentsRepository.create({
      ...appointment,
      ...updateAppointmentDto,
      doctor,
      patient,
    });
    return this.appointmentsRepository.save(updatedAppointment);
  }

  async remove(id: number) {
    //check if the appointment exists
    const appointment = await this.findOne(id);
    await this.appointmentsRepository.delete(id);
    return {
      message: 'Appointment deleted successfully',
      appointment,
    };
  }
}
