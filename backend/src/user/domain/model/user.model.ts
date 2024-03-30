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
  tfaEnabled?: boolean;
  tfaSecret?: string;
  tfaAuthenticated?: boolean;
};

export class User extends Model<UserProps> {
  protected props = {} as UserProps;

  constructor(
    {
      username,
      nickname,
      email,
      status,
      token,
      tfaEnabled,
      tfaSecret,
      tfaAuthenticated,
    }: UserProps,
    id?: string,
  ) {
    super(id);
    this.props.username = username;
    this.props.nickname = nickname;
    this.props.email = email;
    this.props.status = status || UserStatusEnum.OFFLINE;
    this.props.token = token;
    this.props.tfaEnabled = tfaEnabled;
    this.props.tfaSecret = tfaSecret;
    this.props.tfaAuthenticated = tfaAuthenticated;
  }

  getUsername(): string {
    return this.props.username;
  }

  getNickname(): string {
    return this.props.nickname;
  }

  setNickname(nickname: string) {
    this.props.nickname = nickname;
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

  getTfaEnabled(): boolean {
    return this.props.tfaEnabled;
  }

  setTfaEnabled(tfaEnabled: boolean) {
    this.props.tfaEnabled = tfaEnabled;
  }

  getTfaSecret(): string {
    return this.props.tfaSecret;
  }

  setTfaSecret(tfaSecret: string) {
    this.props.tfaSecret = tfaSecret;
  }

  getTfaAuthenticated(): boolean {
    return this.props.tfaAuthenticated;
  }

  setTfaAuthenticated(tfaAuthenticated: boolean) {
    this.props.tfaAuthenticated = tfaAuthenticated;
  }

  setStatus(status: UserStatusEnum) {
    this.props.status = status;
  }

  toMatchHistory() {
    return {
      id: this.id,
      username: this.props.username,
      nickname: this.props.nickname,
    };
  }
}
