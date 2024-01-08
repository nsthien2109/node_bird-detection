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

@Index('unique_status_name', ['statusName'], { unique: true })
@Entity('bird_status')
export class BirdStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  statusName: string;

  @Column({ nullable: true })
  @IsString()
  statusVietnameseName: string;

  @OneToMany(() => Bird, (bird) => bird.status)
  @JoinColumn()
  bird: Bird[];
}
