import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Cat {
  @PrimaryColumn({ nullable: false })
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  age: number;

  @Column({ nullable: false })
  breed: string;
}
