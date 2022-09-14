import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Assignement } from "./Assignement";
import { Professor, Student } from "./User";

@Entity()
export class Exam {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'int' })
  semester: number;

  @Column({ type: 'int' })
  espb: number;

  @ManyToOne(() => Professor)
  professor: Professor;

  @ManyToMany(() => Student, s => s.exams, { cascade: true })
  @JoinTable({
    name: 'student_exams',
    inverseJoinColumn: { name: 'student_id' },
    joinColumn: { name: 'exam_id' }
  })
  students: Student[];


  @OneToMany(() => Assignement, a => a.exam, { cascade: true })
  assignements: Assignement[];
}
