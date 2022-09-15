import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FindUserService from '../services/FindUserService';
import CreateUserService from '../services/CreateUserService';

describe('FindUser', () => {
  it('Should find an user.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    const findUser = new FindUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    const response = await findUser.execute({
      id: user.id,
    });

    expect(response).toEqual(user);
  });

  it('Should not find if id is invalid.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    const findUser = new FindUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    try {
      await findUser.execute({
        id: 'any_id',
      });
    } catch (err: any) {
      expect(err.statusCode).toBe(400);
      expect(err.message).toBe('User not found.');
    }
  });
});
