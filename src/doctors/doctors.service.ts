import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor) private doctorsRepository: Repository<Doctor>,
  ) {}

  create(createDoctorDto: CreateDoctorDto) {
    const doctor = this.doctorsRepository.create(createDoctorDto);
    return this.doctorsRepository.save(doctor);
  }

  findAll() {
    return this.doctorsRepository.find();
  }

  async findOne(id: number) {
    const doctor = await this.doctorsRepository.findOne({
      where: {
        doctorId: id,
      },
    });
    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    const doctor = await this.findOne(id);

    const updatedDoctor = this.doctorsRepository.create({
      ...doctor,
      ...updateDoctorDto,
    });
    return this.doctorsRepository.save(updatedDoctor);
  }

  async remove(id: number) {
    const doctor = await this.findOne(id);
    await this.doctorsRepository.delete(id);
    return {
      message: 'Doctor deleted successfully',
      doctor,
    };
  }
}
