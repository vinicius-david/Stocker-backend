import { Repository } from 'typeorm';
import dataSource from '../database';
import User from '../models/User';
import IUsersRepository from './IUsersRepository';

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

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = dataSource.getRepository(User);
  }

  public async create({ name, email, password }: createDTO): Promise<User> {
    const user = this.ormRepository.create({
      name, email, password, stocks: [],
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async find(): Promise<User[]> {
    return this.ormRepository.find();
  }

  public async findOne(data: findOneDTO): Promise<User | null> {
    return this.ormRepository.findOne(data);
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findByNameOrEmail({ name, email }: findByNameOrEmailDTO): Promise<User | null> {
    const user = await this.ormRepository.findOne({
      where: [{ name }, { email }],
    });

    return user;
  }
}

export default UsersRepository;
