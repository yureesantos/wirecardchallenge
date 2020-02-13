import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';

describe('Buyer', () => {
  beforeEach(async () => {
    await truncate();
  });
  it('should be abble to create a buyer', async () => {
    const response = await request(app)
      .post('/buyers')
      .send({
        name: 'Maria Luiza',
        email: 'maria@wirecard.com',
        cpf: '14080877404',
      });
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with email or cpf already registered', async () => {
    await request(app)
      .post('/buyers')
      .send({
        name: 'Maria Luiza',
        email: 'maria@wirecard.com',
        cpf: '14080877404',
      });
    const response = await request(app)
      .post('/buyers')
      .send({
        name: 'Maria Luiza',
        email: 'maria@wirecard.com',
        cpf: '14080877404',
      });

    expect(response.status).toBe(400);
  });

  it('should not be possible to create a buyer with invalid data', async () => {
    const response = await request(app)
      .post('/buyers')
      .send({
        name: 'Maria Luiza',
        email: 'mariawirecard.com',
        cpf: '14080877404',
      });
    expect(response.status).toBe(400);
  });
});
