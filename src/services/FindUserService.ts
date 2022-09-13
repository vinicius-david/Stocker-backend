import User from '../models/User';
import IUsersRepository from '../repositories/IUsersRepository';

import AppError from '../errors/AppError';

interface Request {
  id: string;
}

class FindUserService {
  usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute({ id }: Request): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}

export default FindUserService;
