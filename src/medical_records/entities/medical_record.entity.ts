import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MedicalRecord {
  @PrimaryGeneratedColumn({ name: 'record_id' })
  recordId: number;

  @Column()
  date: Date;

  @Column({ name: 'patient_id' })
  patientId: number;

  @Column({ name: 'doctor_id' })
  doctorId: number;

  @Column()
  diagonsis: string;

  @Column()
  treatment: string;

  @ManyToOne(() => Patient, (patient) => patient.medicalRecords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'patient_id', referencedColumnName: 'patientId' }])
  patient: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.medicalRecords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'doctor_id', referencedColumnName: 'doctorId' }])
  doctor: Doctor;
}
