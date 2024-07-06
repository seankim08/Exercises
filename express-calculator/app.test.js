const request = require('supertest');
const app = require('./app');

describe('Statistical Operations API', () => {
  describe('GET /mean', () => {
    it('calculates the mean correctly', async () => {
      const res = await request(app).get('/mean?nums=1,3,5,7');
      expect(res.statusCode).toBe(200);
      expect(res.body.response).toEqual({ operation: 'mean', value: 4 });
    });

    it('handles invalid numbers', async () => {
      const res = await request(app).get('/mean?nums=foo,2,3');
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('foo is not a number.');
    });

    it('handles empty input', async () => {
      const res = await request(app).get('/mean');
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('nums are required.');
    });
  });

  describe('GET /median', () => {
    it('calculates the median correctly for odd number of values', async () => {
      const res = await request(app).get('/median?nums=1,3,5,7,9');
      expect(res.statusCode).toBe(200);
      expect(res.body.response).toEqual({ operation: 'median', value: 5 });
    });

    it('calculates the median correctly for even number of values', async () => {
      const res = await request(app).get('/median?nums=1,3,5,7');
      expect(res.statusCode).toBe(200);
      expect(res.body.response).toEqual({ operation: 'median', value: 4 });
    });
  });

  describe('GET /mode', () => {
    it('calculates the mode correctly', async () => {
      const res = await request(app).get('/mode?nums=1,2,2,3,3,3,4,4');
      expect(res.statusCode).toBe(200);
      expect(res.body.response).toEqual({ operation: 'mode', value: [3] });
    });

    it('handles multiple modes', async () => {
      const res = await request(app).get('/mode?nums=1,2,2,3,3,4');
      expect(res.statusCode).toBe(200);
      expect(res.body.response).toEqual({ operation: 'mode', value: [2, 3] });
    });

    it('returns an empty array when all numbers occur with the same frequency', async () => {
      const res = await request(app).get('/mode?nums=1,2,3,4,5');
      expect(res.statusCode).toBe(200);
      expect(res.body.response).toEqual({ operation: 'mode', value: [] });
    });
  });
});