import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Prediction } from './prediction';

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

	@Column()
	bird_order: string;

	@Column()
	family: string;

	@Column('text')
	description: string;

	@Column('text')
	distribution: string;

	@Column('text')
	diet: string;

	@Column('text')
	conservation_status: string;

	@Column()
	class_name: string;

	@OneToMany(() => Prediction, (prediction) => prediction.bird)
	@JoinColumn()
	predictions: Prediction[];
}
