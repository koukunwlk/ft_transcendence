import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity("user")
export class UserEntity {
  @Column({
    primary: true,
    type: 'uuid',
    generated: 'uuid',
  })
  id: string;

  @Column()
  nickname: string;

}
