import { Model } from '@/common/domain/model/model';

export type FriendList = Omit<User, "friendList">;

export enum UserStatusEnum {
  OFFLINE,
  ONLINE,
  INVISIBLE,
  AFK,
  IN_GAME,
}

export type UserProps = {
  id?: string;
  nickname: string;
  status?: UserStatusEnum;
};

export class User extends Model<UserProps> {
  protected props = {} as UserProps;

  constructor({ nickname, status }: UserProps, id?: string) {
    super(id);
    this.props.nickname = nickname;
    this.props.status = status || UserStatusEnum.OFFLINE;
  }

  getNickname(): string {
    return this.props.nickname;
  }

  getStatus(): UserStatusEnum {
    return this.props.status;
  }
}
