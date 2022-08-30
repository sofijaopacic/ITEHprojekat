import { UserConstants } from "../constants";
import { ChildEntity } from "typeorm";
import { User } from "./User";


@ChildEntity(UserConstants.PROFESSOR)
export class Professor extends User {

}