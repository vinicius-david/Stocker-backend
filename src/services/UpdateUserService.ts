import { compare, hash } from 'bcryptjs';

import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

import AppError from '../errors/AppError';

interface Request {
  id: string;
  name: string;
  email: string;
  password: string;
  newPassword?: string;
}

class UpdateUserService {
  public async execute({
    id, name, email, password, newPassword,
  }: Request): Promise<User> {
    const usersRepository = UsersRepository;

    const user = await usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new AppError('User not found.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect password.');
    }

    user.name = name || user.name;

    if (email && email !== user.email) {
      const findExistingUser = await usersRepository.findByNameOrEmail({ email });

      if (findExistingUser) {
        throw new AppError('Name or email already used.');
      }

      user.email = email;
    }

    if (newPassword) {
      const hashedNewPassword = await hash(newPassword, 8);

      user.password = hashedNewPassword;
    }

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
