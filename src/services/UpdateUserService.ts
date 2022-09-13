import { compare, hash } from 'bcryptjs';

import User from '../models/User';
import IUsersRepository from '../repositories/IUsersRepository';

import AppError from '../errors/AppError';

interface Request {
  id: string;
  name: string;
  email: string;
  password: string;
  newPassword?: string;
}

class UpdateUserService {
  usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute({
    id, name, email, password, newPassword,
  }: Request): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new AppError('User not found.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect password.');
    }

    user.name = name || user.name;

    if (email && email !== user.email) {
      const findExistingUser = await this.usersRepository.findByNameOrEmail({ email });

      if (findExistingUser) {
        throw new AppError('Name or email already used.');
      }

      user.email = email;
    }

    if (newPassword) {
      const hashedNewPassword = await hash(newPassword, 8);

      user.password = hashedNewPassword;
    }

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
