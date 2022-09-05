import dataSource from '../database';
import User from '../models/User';

interface findDTO {
  name?: string;
  email?: string;
}

const UsersRepository = dataSource.getRepository(User).extend({
  async findByNameOrEmail({ name, email }: findDTO): Promise<User | null> {
    const user = await this.findOne({
      where: [{ name }, { email }],
    });

    return user;
  },
});

export default UsersRepository;
