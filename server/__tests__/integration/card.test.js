import request from 'supertest';
import app from '../../src/app';
import truncate from '../util/truncate';

import Buyer from '../../src/app/models/Buyer';

describe('Cards', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to create a card', async () => {
    const buyer = await Buyer.create({
      name: 'Yure',
      email: 'teste@wirecard.com',
      cpf: '09890110466',
    });
    const response = await request(app)
      .post('/cards')
      .send({
        buyer_id: buyer.id,
        card_holder: 'Fulano de Tal',
        card_number: '4444111122223333',
        card_expiration: '03/27',
        card_cvv: 123,
      });
    expect(response.body).toHaveProperty('id');
  });

  it('should use a valid data to create a card', async () => {
    const buyer = await Buyer.create({
      name: 'Yure',
      email: 'teste@wirecard.com',
      cpf: '09890110466',
    });
    const response = await request(app)
      .post('/cards')
      .send({
        buyer_id: buyer.id,
        card_holder: 'Fulano de Tal',
        card_number: '444411112222333',
        card_expiration: '03/27',
        card_cvv: 123,
      });
    expect(response.status).toBe(400);
  });
});
