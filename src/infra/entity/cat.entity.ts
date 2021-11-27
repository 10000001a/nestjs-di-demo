import { Entity, Column } from 'typeorm';

@Entity()
export class User {
  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;
}
