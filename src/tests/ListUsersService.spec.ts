import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ListUsersService from '../services/ListUsersService';
import CreateUserService from '../services/CreateUserService';

describe('FindUser', () => {
  it('Should find all users.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    const listUsers = new ListUsersService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    const user2 = await createUser.execute({
      name: 'any_name2',
      email: 'any_email2',
      password: 'any_password',
    });

    const users = await listUsers.execute();

    expect(users.length).toBe(2);
    expect(users[0].id).toBe(user.id);
    expect(users[1].id).toBe(user2.id);
  });
});
