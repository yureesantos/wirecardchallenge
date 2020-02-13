import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';
import truncate from '../util/truncate';

import Card from '../../src/app/models/Card';

describe('Cards', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt credit card number', async () => {
    await request(app)
      .post('/buyers')
      .send({
        id: 1,
        name: 'Yure',
        email: 'yure@wirecard.com',
        cpf: '09890110466',
      });
    const card = await Card.create({
      buyer_id: 1,
      card_holder: 'Yure A Santos',
      card_number: '4984555577771111',
      card_expiration: '03/27',
      card_cvv: 354,
    });

    const compareHash = await bcrypt.compare(
      '4984555577771111',
      card.card_number_hash
    );

    expect(compareHash).toBe(true);
  });
});
