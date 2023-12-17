import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsNumber } from "class-validator";
import { History } from "./history";
import { Bird } from "./bird";

@Entity()
export class Prediction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  confidence: number;

  @ManyToOne(() => History, (history) => history.id)
  @JoinColumn()
  history: History;

  @ManyToOne(() => Bird, (bird) => bird.id)
  @JoinColumn()
  bird: Bird;
}
