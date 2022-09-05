import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

import AppError from '../errors/AppError';

interface Request {
  userId: string;
  stockId: string;
}

class AddOrRemoveStockService {
  public async execute({ userId, stockId }: Request): Promise<User> {
    const usersRepository = UsersRepository;

    const user = await usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new AppError('User not found.');
    }

    // TODO: find stock object to verify id;

    user.stocks = user.stocks ? user.stocks : [];

    const stockIndex = user.stocks.findIndex(stock => stock === stockId);

    if (stockIndex > -1) {
      user.stocks.splice(stockIndex, 1);
    } else {
      user.stocks.push(stockId);
    }

    await usersRepository.save(user);

    return user;
  }
}

export default AddOrRemoveStockService;
