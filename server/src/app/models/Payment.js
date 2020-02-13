import Sequelize, { Model } from 'sequelize';

class Payment extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: Sequelize.FLOAT,
        type: Sequelize.INTEGER,
        status: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Buyer, { foreignKey: 'buyer_id', as: 'buyer' });
    this.belongsTo(models.Client, { foreignKey: 'client_id', as: 'client' });
    this.belongsTo(models.Card, { foreignKey: 'card_id', as: 'card' });
  }
}

export default Payment;
