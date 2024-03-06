import { Model } from '@/common/domain/model/model';

export type FriendList = Omit<User, 'friendList'>;

export enum UserStatusEnum {
  OFFLINE,
  ONLINE,
  INVISIBLE,
  AFK,
  IN_GAME,
}

export type UserProps = {
  id?: string;
  username: string;
  nickname?: string;
  email: string;
  status?: UserStatusEnum;
  token?: string;
};

export class User extends Model<UserProps> {
  protected props = {} as UserProps;

  constructor(
    { username, nickname, email, status, token }: UserProps,
    id?: string,
  ) {
    super(id);
    this.props.username = username;
    this.props.nickname = nickname;
    this.props.email = email;
    this.props.status = status || UserStatusEnum.OFFLINE;
    this.props.token = token;
  }

  toJson(): string {
    return JSON.stringify({
      id: this.id,
      username: this.props.username,
      nickname: this.props.nickname,
      email: this.props.email,
      status: this.props.status,
    });
  }

  getUsername(): string {
    return this.props.username;
  }

  getNickname(): string {
    return this.props.nickname;
  }

  getEmail(): string {
    return this.props.email;
  }

  getStatus(): UserStatusEnum {
    return this.props.status;
  }

  getToken(): string {
    return this.props.token;
  }

  setToken(token: string) {
    this.props.token = token;
  }
}
