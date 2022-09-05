import { hash } from 'bcryptjs';

import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = UsersRepository;

    const findExistingUser = await usersRepository.findByNameOrEmail({ name, email });

    if (findExistingUser) {
      throw new AppError('Name or email already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name, email, password: hashedPassword, stocks: [],
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
