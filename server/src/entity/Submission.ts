import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Assignement } from "./Assignement";
import { Professor, Student } from "./User";

export type SubmissionStatus = 'pending' | 'passed' | 'failed';

@Entity()
export class Submission {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  assignementId: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  fileUrl: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'passed', 'failed']
  })
  status: SubmissionStatus


  @Column({ type: 'int' })
  points: number;

  @ManyToOne(() => Student)
  student: Student;

  @ManyToOne(() => Professor)
  professor?: Professor;

  @ManyToOne(() => Assignement)
  @JoinColumn({
    name: 'assignementId'
  })
  assignement: Assignement;
}