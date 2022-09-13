import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from '../services/CreateUserService';

describe('CreateUser', () => {
  it('Should create a new user.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('any_name');
  });

  // it('Should not create two users with same email.', () => {

  // });

  // it('Should not create two users with same name.', () => {

  // });
});
