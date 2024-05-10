import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicalRecordDto } from './dto/create-medical_record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical_record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalRecord } from './entities/medical_record.entity';
import { Repository } from 'typeorm';
import { DoctorsService } from 'src/doctors/doctors.service';
import { PatientsService } from 'src/patients/patients.service';

@Injectable()
export class MedicalRecordsService {
  constructor(
    @InjectRepository(MedicalRecord)
    private medicalRecordsRepository: Repository<MedicalRecord>,
    private doctorsService: DoctorsService,
    private patientsService: PatientsService,
  ) {}

  async create(createMedicalRecordDto: CreateMedicalRecordDto) {
    //checking if the doctor and patient exist in their table
    await this.doctorsService.findOne(createMedicalRecordDto.doctorId);
    await this.patientsService.findOne(createMedicalRecordDto.patientId);

    //creating the new appintment
    const medicalRecord = this.medicalRecordsRepository.create(
      createMedicalRecordDto,
    );
    return this.medicalRecordsRepository.save(medicalRecord);
  }

  findAll() {
    return this.medicalRecordsRepository.find({
      relations: ['doctor', 'patient'],
    });
  }

  async findOne(id: number) {
    const medicalRecord = await this.medicalRecordsRepository.findOne({
      where: {
        recordId: id,
      },
      relations: ['doctor', 'patient'],
    });
    //if there is no medicalRecord throw an error
    if (!medicalRecord) throw new NotFoundException('Medical Record not found');
    return medicalRecord;
  }

  async update(id: number, updateMedicalRecordDto: UpdateMedicalRecordDto) {
    //checking if the medical record's id exists
    const medicalRecord = await this.findOne(id);

    //if the user try to update the doctor's id, check if the id exists
    let doctor = medicalRecord.doctor;
    if (updateMedicalRecordDto?.doctorId) {
      doctor = await this.doctorsService.findOne(
        updateMedicalRecordDto?.doctorId,
      );
    }

    //if the user try to update the patient's id, check if the id exists
    let patient = medicalRecord.patient;
    if (updateMedicalRecordDto?.patientId) {
      patient = await this.patientsService.findOne(
        updateMedicalRecordDto?.patientId,
      );
    }

    //update the medical record
    const updatedMedicalRecord = this.medicalRecordsRepository.create({
      ...medicalRecord,
      ...updateMedicalRecordDto,
      doctor,
      patient,
    });
    return this.medicalRecordsRepository.save(updatedMedicalRecord);
  }

  async remove(id: number) {
    //check if the medical record's id exists
    const medicalRecord = await this.findOne(id);
    await this.medicalRecordsRepository.delete(id);
    return medicalRecord;
  }
}
