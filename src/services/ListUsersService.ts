import User from '../models/User';
import IUsersRepository from '../repositories/IUsersRepository';

class ListUsersService {
  usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute(): Promise<User[]> {
    const users = await this.usersRepository.find();

    return users;
  }
}

export default ListUsersService;
