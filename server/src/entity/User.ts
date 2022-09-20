import { UserConstants } from "../constants";
import { ChildEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { EncryptionTransformer } from "typeorm-encrypted";
import { Exam } from "./Exam";


@Entity()
@TableInheritance({ column: { name: 'type', type: 'varchar' } })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({
    select: false,
    transformer: new EncryptionTransformer({
      key: 'e41c966f21f9e157780246fff924e6a3feddd751f201304213b2f845d8841a61',
      algorithm: 'aes-256-cbc',
      ivLength: 16,
      iv: 'ff5ac19190424b1d88f9419ef949ae56'
    })
  })
  password?: string;

  @Column({ name: 'type', insert: false, update: false })
  type: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

}

@ChildEntity(UserConstants.PROFESSOR)
export class Professor extends User {

}


@ChildEntity(UserConstants.STUDENT)
export class Student extends User {

  @Column()
  index: string;

  @ManyToMany(() => Exam, e => e.students)
  exams: Exam[];
}