import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Professor, Student } from "./User";

export type SubmissionStatus = 'pending' | 'passed' | 'failed';

@Entity()
export class Submission {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  fileUrl: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'passed', 'failed']
  })
  status: SubmissionStatus

  @Column()
  fileName: string;

  @Column({ type: 'int' })
  points: number;

  @ManyToOne(() => Student)
  student: Student;

  @ManyToOne(() => Professor)
  professor: Professor;
}