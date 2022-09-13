/* eslint-disable no-unused-vars */
import { hash } from 'bcryptjs';

import User from '../models/User';
import AppError from '../errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute({ name, email, password }: Request): Promise<User> {
    const findExistingUser = await this.usersRepository.findByNameOrEmail({ name, email });

    if (findExistingUser) {
      throw new AppError('Name or email already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name, email, password: hashedPassword, stocks: [],
    });

    await this.usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
