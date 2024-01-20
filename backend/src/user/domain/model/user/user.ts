import { Model } from '@/common/domain/model/model';

export type UserProps = {
  nickname: string;
};

export class User extends Model<UserProps> {
  protected props = {} as UserProps;

  constructor({ nickname }: UserProps, id?: string) {
    super(id);
    this.props.nickname = nickname;
  }

  getNickname(): string {
    return this.props.nickname;
  }
}
