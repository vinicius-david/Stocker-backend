import User from '../models/User';
import IUsersRepository from '../repositories/IUsersRepository';

import AppError from '../errors/AppError';

interface Request {
  userId: string;
  stockId: string;
}

class AddOrRemoveStockService {
  usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute({ userId, stockId }: Request): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

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

    await this.usersRepository.save(user);

    return user;
  }
}

export default AddOrRemoveStockService;
