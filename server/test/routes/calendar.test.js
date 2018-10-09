const chai = require('chai');

const { app } = chai;


describe('Calendar Router', () => {
  it('GET /api/calendar', async () => {
    const res = await chai.request(app).get('/api/calendar');
    res.status.should.be.equal(200);
  });
});
