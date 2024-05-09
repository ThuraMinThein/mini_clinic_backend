import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MedicalRecord {
  @PrimaryGeneratedColumn({ name: 'record_id' })
  recordId: number;

  @Column()
  date: Date;

  @Column()
  diagonsis: string;

  @Column()
  treatment: string;

  @ManyToOne(() => Patient, (patient) => patient.medicalRecords)
  patient: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.medicalRecords)
  doctor: Doctor;
}
