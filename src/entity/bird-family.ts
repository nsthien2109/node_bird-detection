import { IsString } from "class-validator";
import { Column, Entity, Index, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Bird } from "./bird";

@Index("unique_family_name", ["familyName"], { unique: true })
@Entity("bird_family")
export class BirdFamily {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  familyName: string;

  @Column({ nullable: true })
  @IsString()
  familyVietnameseName: string;

  @OneToMany(() => Bird, (bird) => bird.family)
  @JoinColumn()
  birds: Bird[];
}
