import { Model } from '@/common/domain/model/model';



export type FriendListProps = {
  friendId: string;
};

export class FriendList extends Model<FriendListProps> {
  protected props = {} as FriendListProps;

  constructor({ friendId }: FriendListProps, id?: string) {
    super(id);
    this.props.friendId = friendId;
  }
}
