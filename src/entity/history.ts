import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsDate, IsNumber, IsString } from "class-validator";
import { User } from "./user";
import { Prediction } from "./prediction";

@Entity("histories")
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsDate()
  date: Date;

  @Column()
  @IsString()
  url: string;

  @OneToMany(() => Prediction, (prediction) => prediction.history)
  @JoinColumn()
  predictions: Prediction[];

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;
}
