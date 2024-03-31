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
  avatar?: Buffer;
  score?: number;
  ranking?: number;
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
      avatar,
      score,
      ranking
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
    this.props.avatar = avatar;
    this.props.score = score;
    this.props.ranking = ranking;
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

  getAvatar(): Buffer {
    return this.props.avatar;
  }

  setAvatar(avatar: Buffer) {
    this.props.avatar = avatar;
  }

  getScore(): number {
    return this.props.score;
  }

  setScore(score: number) {
    this.props.score = score;
  }

  getRanking(): number {
    return this.props.ranking;
  }

  setRanking(ranking: number) {
    this.props.ranking = ranking;
  }

  toScore() {
    return {
      id: this.id,
      username: this.props.username,
      nickname: this.props.nickname,
      score: this.props.score
    };
  }

  toSimpleEntity() {
    return {
      id: this.id,
      username: this.props.username,
      nickname: this.props.nickname,
    };
  }
  toFriendList() {
    return {
      id: this.id,
      username: this.props.username,
      nickname: this.props.nickname,
      status: this.props.status,
      ranking: this.props.ranking
    };
  }
}
