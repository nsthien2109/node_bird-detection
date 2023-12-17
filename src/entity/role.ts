import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RoleName } from "../shared/constants";

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  roleName: RoleName;
}
