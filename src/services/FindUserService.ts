import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

import AppError from '../errors/AppError';

interface Request {
  id: string;
}

class FindUserService {
  public async execute({ id }: Request): Promise<User> {
    const usersRepository = UsersRepository;

    const user = await usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}

export default FindUserService;
