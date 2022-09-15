import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';
import AuthUserService from '../services/AuthUserService';

describe('CreateUser', () => {
  it('Should update user password.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    const updateUser = new UpdateUserService(fakeUsersRepository);
    const authUser = new AuthUserService(fakeUsersRepository);

    let user = await createUser.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    user = await updateUser.execute({
      id: user.id,
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      newPassword: 'any_password2',
    });

    const response = await authUser.execute({
      email: 'any_email',
      password: 'any_password2',
    });

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('user');
    expect(response.user.id).toBe(user.id);
  });

  it('Should update user name.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    const updateUser = new UpdateUserService(fakeUsersRepository);

    let user = await createUser.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    user = await updateUser.execute({
      id: user.id,
      name: 'any_name2',
      email: 'any_email',
      password: 'any_password',
    });

    expect(user.name).toBe('any_name2');
  });

  it('Should update user email.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    const updateUser = new UpdateUserService(fakeUsersRepository);

    let user = await createUser.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    user = await updateUser.execute({
      id: user.id,
      name: 'any_name',
      email: 'any_email2',
      password: 'any_password',
    });

    expect(user.email).toBe('any_email2');
  });

  it('Should not update user if id is invalid.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const updateUser = new UpdateUserService(fakeUsersRepository);

    try {
      await updateUser.execute({
        id: 'any_id',
        name: 'any_name',
        email: 'any_email2',
        password: 'any_password',
      });
    } catch (err: any) {
      expect(err.statusCode).toBe(400);
      expect(err.message).toBe('User not found.');
    }
  });

  it('Should not update user if password is incorrect.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    const updateUser = new UpdateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    try {
      await updateUser.execute({
        id: user.id,
        name: 'any_name',
        email: 'any_email',
        password: 'any_password2',
      });
    } catch (err: any) {
      expect(err.statusCode).toBe(400);
      expect(err.message).toBe('Incorrect password.');
    }
  });

  it('Should not update user if name is already used.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    const updateUser = new UpdateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    await createUser.execute({
      name: 'any_name2',
      email: 'any_email2',
      password: 'any_password',
    });

    try {
      await updateUser.execute({
        id: user.id,
        name: 'any_name2',
        email: 'any_email',
        password: 'any_password',
      });
    } catch (err: any) {
      expect(err.statusCode).toBe(400);
      expect(err.message).toBe('Name or email already used.');
    }
  });

  it('Should not update user if email is already used.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    const updateUser = new UpdateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    await createUser.execute({
      name: 'any_name2',
      email: 'any_email2',
      password: 'any_password',
    });

    try {
      await updateUser.execute({
        id: user.id,
        name: 'any_name',
        email: 'any_email2',
        password: 'any_password',
      });
    } catch (err: any) {
      expect(err.statusCode).toBe(400);
      expect(err.message).toBe('Name or email already used.');
    }
  });
});
