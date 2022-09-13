import User from '../models/User';
import IUsersRepository from '../repositories/IUsersRepository';

import AppError from '../errors/AppError';

class ListUsersService {
  usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute(): Promise<User[]> {
    const users = await this.usersRepository.find();

    if (!users) {
      throw new AppError('Users not found.');
    }

    return users;
  }
}

export default ListUsersService;
