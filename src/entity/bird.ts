import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Prediction } from './prediction';
import { BirdStatus } from './bird-status';
import { BirdOrder } from './bird-order';
import { BirdFamily } from './bird-family';

@Entity('birds')
export class Bird {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  common_name: string;

  @Column()
  vietnamese_name: string;

  @Column()
  scientific_name: string;

  @Column('text')
  description: string;

  @Column('text')
  distribution: string;

  @Column('text')
  diet: string;

  @Column()
  class_name: string;

  @ManyToOne(() => BirdStatus, (status) => status.id, { nullable: true })
  @JoinColumn()
  status: BirdStatus;

  @ManyToOne(() => BirdOrder, (order) => order.id)
  @JoinColumn()
  order: BirdOrder;

  @ManyToOne(() => BirdFamily, (family) => family.id)
  @JoinColumn()
  family: BirdFamily;

  @OneToMany(() => Prediction, (prediction) => prediction.bird)
  @JoinColumn()
  predictions: Prediction[];
}
