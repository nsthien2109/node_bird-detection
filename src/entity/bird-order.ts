import { IsString } from 'class-validator';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bird } from './bird';

@Index('unique_order_name', ['orderName'], { unique: true })
@Entity('bird_order')
export class BirdOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  orderName: string;

  @Column({ nullable: true })
  @IsString()
  orderVietnameseName: string;

  @OneToMany(() => Bird, (bird) => bird.order)
  @JoinColumn()
  bird: Bird[];
}
