import request from 'supertest';
import app from '../src/server/server';

let server;

beforeAll(done => {
  server = app.listen(0, () => {
    console.log(`Test server running on port ${server.address().port}`);
    done();
  });
});

afterAll(done => {
  server.close(done);
});

describe('Testing the Geonames API endpoint', () => {
  test('POST /api/geonames should respond with JSON', async () => {
    const response = await request(server)
      .post('/api/geonames')
      .send({ city: 'London' });

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });
});
