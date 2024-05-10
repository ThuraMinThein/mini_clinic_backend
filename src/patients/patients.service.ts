import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient) private patientsRepository: Repository<Patient>,
  ) {}

  create(createPatientDto: CreatePatientDto) {
    const patient = this.patientsRepository.create(createPatientDto);
    return this.patientsRepository.save(patient);
  }

  findAll() {
    return this.patientsRepository.find();
  }

  async findOne(id: number) {
    const patient = await this.patientsRepository.findOne({
      where: {
        patientId: id,
      },
    });
    if (!patient) throw new NotFoundException('Patient not found');
    return patient;
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const patient = await this.findOne(id);

    const updatedPatient = this.patientsRepository.create({
      ...patient,
      ...updatePatientDto,
    });

    return this.patientsRepository.save(updatedPatient);
  }

  async remove(id: number) {
    const patient = await this.findOne(id);
    await this.patientsRepository.delete(patient);
    return {
      message: 'Patient deleted successfully',
      patient,
    };
  }
}
