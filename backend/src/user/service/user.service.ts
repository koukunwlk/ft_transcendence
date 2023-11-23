import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { User } from '../domain/model/user/user';

@Injectable()
export class UserService {
  constructor(
	@Inject(UserRepository)
	private readonly userRepository: UserRepository
  ) { }

  async insertUser(nickname: string) :Promise<string>{
	const user = new User({
		nickname
	})
	const id = await this.userRepository.insert(user)

	return id
  }
}
