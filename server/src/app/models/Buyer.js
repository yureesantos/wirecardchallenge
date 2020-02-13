import Sequelize, { Model } from 'sequelize';

class Buyer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        cpf: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Buyer;
