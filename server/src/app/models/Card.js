import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Card extends Model {
  static init(sequelize) {
    super.init(
      {
        card_holder: Sequelize.STRING,
        card_number: Sequelize.VIRTUAL,
        card_number_hash: Sequelize.STRING,
        card_expiration: Sequelize.STRING,
        card_cvv: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async card => {
      if (card.card_number) {
        card.card_number_hash = await bcrypt.hash(card.card_number, 8);
      }
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Buyer, { foreignKey: 'buyer_id', as: 'buyer' });
  }
}

export default Card;
