import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';

import Buyer from '../../src/app/models/Buyer';
import Client from '../../src/app/models/Client';
import Card from '../../src/app/models/Card';
import Payment from '../../src/app/models/Payment';

describe('Payment', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to create a payment with a credit card', async () => {
    const buyer = await Buyer.create({
      name: 'Yure',
      email: 'teste@wirecard.com',
      cpf: '09890110466',
    });
    const client = await Client.create({
      name: 'Casas Bahia',
    });
    const card = await Card.create({
      buyer_id: buyer.id,
      card_holder: 'Fulano de Tal',
      card_number: '4444111122223333',
      card_expiration: '03/27',
      card_cvv: 123,
    });
    const response = await request(app)
      .post('/payments')
      .send({
        buyer_id: buyer.id,
        client_id: client.id,
        card_id: card.id,
        amount: 200,
        type: 1,
      });
    expect(response.body).toHaveProperty('id');
  });
  it('should be able to update a payment status', async () => {
    const buyer = await Buyer.create({
      name: 'Yure',
      email: 'teste@wirecard.com',
      cpf: '09890110466',
    });
    const client = await Client.create({
      name: 'Casas Bahia',
    });
    const card = await Card.create({
      buyer_id: buyer.id,
      card_holder: 'Fulano de Tal',
      card_number: '4444111122223333',
      card_expiration: '03/27',
      card_cvv: 123,
    });
    const payment = await Payment.create({
      buyer_id: buyer.id,
      client_id: client.id,
      card_id: card.id,
      amount: 200,
      type: 1,
    });

    const response = await request(app)
      .put(`/payments/${payment.id}`)
      .send({
        status: 'paid',
      });
    expect(response.status).toBe(200);
  });
  it('should not be able to update a payment with invalid status', async () => {
    const buyer = await Buyer.create({
      name: 'Yure',
      email: 'teste@wirecard.com',
      cpf: '09890110466',
    });
    const client = await Client.create({
      name: 'Casas Bahia',
    });
    const card = await Card.create({
      buyer_id: buyer.id,
      card_holder: 'Fulano de Tal',
      card_number: '4444111122223333',
      card_expiration: '03/27',
      card_cvv: 123,
    });
    const payment = await Payment.create({
      buyer_id: buyer.id,
      client_id: client.id,
      card_id: card.id,
      amount: 200,
      type: 1,
    });
    const response = await request(app)
      .put(`/payments/${payment.id}`)
      .send({
        statuss: 'invalid',
      });
    expect(response.status).toBe(400);
  });
  it('should be consult a payment status', async () => {
    const buyer = await Buyer.create({
      name: 'Yure',
      email: 'teste@wirecard.com',
      cpf: '09890110466',
    });
    const client = await Client.create({
      name: 'Casas Bahia',
    });
    const card = await Card.create({
      buyer_id: buyer.id,
      card_holder: 'Fulano de Tal',
      card_number: '4444111122223333',
      card_expiration: '03/27',
      card_cvv: 123,
    });
    const payment = await Payment.create({
      buyer_id: buyer.id,
      client_id: client.id,
      card_id: card.id,
      amount: 200,
      type: 1,
    });
    const response = await request(app).get(`/payments/${payment.id}`);
    expect(response.body).toHaveProperty('status');
  });
});
