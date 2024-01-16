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
  nickname: string;
  status?: UserStatusEnum;
  friendList?: User[];
};

export class User extends Model<UserProps> {
  protected props = {} as UserProps;

  constructor({ nickname, status, friendList }: UserProps, id?: string) {
    super(id);
    this.props.nickname = nickname;
    this.props.status = status || UserStatusEnum.OFFLINE;
    this.props.friendList = friendList;
  }

  getNickname(): string {
    return this.props.nickname;
  }

  getStatus(): UserStatusEnum {
    return this.props.status;
  }

  getFriendList(): User[] {
    return this.props.friendList;
  }
}
