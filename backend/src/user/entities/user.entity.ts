import { Column, Entity } from 'typeorm';
import { UserStatusEnum } from '../domain/model/user.model';

@Entity('user')
export class UserEntity {
  @Column({
    primary: true,
    type: 'uuid',
    generated: 'uuid',
  })
  id: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  token: string;

  @Column({ nullable: true, enum: UserStatusEnum })
  status: UserStatusEnum;

  @Column({ nullable: true })
  validCode: boolean;

  @Column({ nullable: true })
  userId: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  tfaEnabled: boolean;

  @Column({ nullable: true })
  tfaSecret: string;
}
