import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
  OneToMany,
  JoinColumn,
  ViewColumn,
} from "typeorm";
import { Role } from "./role";
import { History } from "./history";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 1 })
  isActive?: boolean;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn()
  role: Role;

  @JoinColumn()
  @OneToMany(() => History, (history) => history.user)
  histories: History[];

  @Column()
  createdAt: Date;
}
