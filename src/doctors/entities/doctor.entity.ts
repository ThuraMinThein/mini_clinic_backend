import { Appointment } from 'src/appointments/entities/appointment.entity';
import { MedicalRecord } from 'src/medical_records/entities/medical_record.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn({ name: 'doctor_id' })
  doctorId: number;

  @Column()
  name: string;

  @Column()
  speciality: string;

  @Column({ name: 'contact_information' })
  contactInfo: string;

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[];

  @OneToMany(() => MedicalRecord, (medicalRecord) => medicalRecord.doctor)
  medicalRecords: MedicalRecord[];
}
