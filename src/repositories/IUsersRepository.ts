/* eslint-disable semi */
/* eslint-disable no-unused-vars */
import User from '../models/User';

interface createDTO {
  name: string;
  email: string;
  password: string;
  stocks: string[];
}

interface findOneDTO {
  where: Object;
}

interface findByNameOrEmailDTO {
  name?: string;
  email?: string;
}

export default interface IUsersRepository {
  create(data: createDTO): Promise<User>;
  find(): Promise<User[]>;
  findOne(data: findOneDTO): Promise<User | null>;
  findByNameOrEmail(data: findByNameOrEmailDTO): Promise<User | null>;
  save(user: User): Promise<User>;
}
