import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';

describe('Client', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to create a client', async () => {
    const response = await request(app)
      .post('/clients')
      .send({
        name: 'Apple Store',
      });
    expect(response.body).toHaveProperty('id');
  });
});
