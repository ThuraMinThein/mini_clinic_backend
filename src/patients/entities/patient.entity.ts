import { Appointment } from 'src/appointments/entities/appointment.entity';
import { MedicalRecord } from 'src/medical_records/entities/medical_record.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn({ name: 'patient_id' })
  patientId: number;

  @Column()
  name: string;

  @Column({ name: 'date_of_birth' })
  dateOfBirth: Date;

  @Column({ name: 'contact_information' })
  contactInfo: string;

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];

  @OneToMany(() => MedicalRecord, (medicalRecord) => medicalRecord.patient)
  medicalRecords: MedicalRecord[];
}
