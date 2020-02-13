module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cards', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      buyer_id: {
        type: Sequelize.INTEGER,
        references: { model: 'buyers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNulll: true,
      },
      card_holder: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      card_number_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      card_expiration: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      card_cvv: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cards');
  },
};
