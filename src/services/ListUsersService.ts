import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

import AppError from '../errors/AppError';

class ListUsersService {
  public async execute(): Promise<User[]> {
    const usersRepository = UsersRepository;

    const users = await usersRepository.find();

    if (!users) {
      throw new AppError('Users not found.');
    }

    return users;
  }
}

export default ListUsersService;
