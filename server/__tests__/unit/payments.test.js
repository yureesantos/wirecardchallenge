import request from 'supertest';
import app from '../../src/app';
import truncate from '../util/truncate';

import Buyer from '../../src/app/models/Buyer';
import Client from '../../src/app/models/Client';

describe('Cards', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should generate a boleto number when payment type is 2', async () => {
    const buyer = await Buyer.create({
      name: 'Yure',
      email: 'teste@wirecard.com',
      cpf: '09890110466',
    });
    const client = await Client.create({
      name: 'Casas Bahia',
    });
    const response = await request(app)
      .post('/payments')
      .send({
        buyer_id: buyer.id,
        client_id: client.id,
        amount: 200,
        type: 2,
      });
    expect(response.body).toHaveProperty('boleto');
  });
});
