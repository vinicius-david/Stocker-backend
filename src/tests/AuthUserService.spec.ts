import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthUserService from '../services/AuthUserService';
import CreateUserService from '../services/CreateUserService';

describe('AuthUser', () => {
  it('Should auth the user successfully.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    const authUser = new AuthUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    const response = await authUser.execute({
      email: 'any_email',
      password: 'any_password',
    });

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('user');
    expect(response.user.id).toBe(user.id);
  });

  it('Should not auth if incorrect email.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    const authUser = new AuthUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    try {
      await authUser.execute({
        email: 'any_email2',
        password: 'any_password',
      });
    } catch (err: any) {
      expect(err.statusCode).toBe(400);
      expect(err.message).toBe('Incorrect email/password combination.');
    }
  });

  it('Should not auth if incorrect password.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    const authUser = new AuthUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    try {
      await authUser.execute({
        email: 'any_email',
        password: 'any_password2',
      });
    } catch (err: any) {
      expect(err.statusCode).toBe(400);
      expect(err.message).toBe('Incorrect email/password combination.');
    }
  });
});
