import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Buyer from '../app/models/Buyer';
import Client from '../app/models/Client';
import Card from '../app/models/Card';
import Payment from '../app/models/Payment';

const models = [Buyer, Client, Card, Payment];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
