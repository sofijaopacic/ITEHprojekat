import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exam } from "./Exam";

@Entity()
export class Assignement {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'int' })
  points: number;

  @Column()
  required: boolean;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Exam, e => e.assignements, { onDelete: 'CASCADE' })
  exam: Exam[];
}