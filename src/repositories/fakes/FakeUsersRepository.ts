import { uuid } from 'uuidv4';
import User from '../../models/User';
import IUsersRepository from '../IUsersRepository';

interface createDTO {
  name: string;
  email: string;
  password: string;
}

interface where {
  id: string;
}

interface findOneDTO {
  where: where;
}

interface findByNameOrEmailDTO {
  name?: string;
  email?: string;
}

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create({ name, email, password }: createDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid(), name, email, password,
    });

    this.users.push(user);

    return user;
  }

  async find(): Promise<User[]> {
    return this.users;
  }

  async findOne(data: findOneDTO): Promise<User | null> {
    return this.users.find(u => u.id === data.where.id) || null;
  }

  async findByNameOrEmail({ name, email }: findByNameOrEmailDTO): Promise<User | null> {
    const user = this.users.find(u => u.name === name || u.email === email);

    return user || null;
  }

  async save(user: User): Promise<User> {
    return user;
  }
}

export default UsersRepository;
