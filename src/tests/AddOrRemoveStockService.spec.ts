import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AddOrRemoveStockService from '../services/AddOrRemoveStockService';
import CreateUserService from '../services/CreateUserService';

describe('AddOrRemoveStock', () => {
  it('Should add stock to favorites.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    const addOrRemoveStock = new AddOrRemoveStockService(fakeUsersRepository);

    let user = await createUser.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    user = await addOrRemoveStock.execute({
      userId: user.id,
      stockId: 'any_stock',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('any_name');
    expect(user.stocks.length).toBe(1);
    expect(user.stocks[0]).toBe('any_stock');
  });

  it('Should remove stock from favorites.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    const addOrRemoveStock = new AddOrRemoveStockService(fakeUsersRepository);

    let user = await createUser.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    await addOrRemoveStock.execute({
      userId: user.id,
      stockId: 'any_stock',
    });

    user = await addOrRemoveStock.execute({
      userId: user.id,
      stockId: 'any_stock',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('any_name');
    expect(user.stocks.length).toBe(0);
  });

  it('Should not add or remove stock when user not found.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const addOrRemoveStock = new AddOrRemoveStockService(fakeUsersRepository);

    try {
      await addOrRemoveStock.execute({
        userId: 'any_id',
        stockId: 'any_stock',
      });
    } catch (err: any) {
      expect(err.statusCode).toBe(400);
      expect(err.message).toBe('User not found.');
    }
  });
});
