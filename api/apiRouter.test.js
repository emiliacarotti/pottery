const { server, handle } = require('../index');
const { client } = require('../db');
const supertest = require('supertest');
const request = supertest(server);

// Test API
describe('/api/health endpoint', () => {

  // Close DB connection and supertest server TCP connection
  afterAll(async () => {
    await client.end();
    handle.close();
  });

  it('should respond with { healthy: true }', async () => {
    const response = await request.get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.healthy).toBe(true);
  });
});
