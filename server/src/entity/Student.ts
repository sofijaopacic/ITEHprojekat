import { UserConstants } from "../constants";
import { ChildEntity, Column } from "typeorm";
import { User } from "./User";


@ChildEntity(UserConstants.STUDENT)
export class Student extends User {

  @Column()
  index: string;
}