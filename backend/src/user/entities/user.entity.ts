import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  token: string;

  @Column({ nullable: true })
  validCode: boolean;

  @Column({ nullable: true })
  userId: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  tfaSecret: string;

}
