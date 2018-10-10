const chai = require('chai');
const moment = require('moment');
const qs = require('querystring');

const {
  app,
  assertError,
  errors,
  models,
} = chai;
const { route_invalid_data, calendar_duplicate_data } = errors;
const { Calendar } = models;
const should = chai.should();


describe('Calendar Router', () => {
  after(async () => {
    await Calendar.deleteMany();
    const result = await Calendar.findOne();
    should.equal(result, null);
  });

  describe('POST /api/calendar', () => {
    const start_date = moment().toISOString();
    const end_date = moment().add(1, 'days').toISOString();
    const postData = {
      title: 'title',
      start_date,
      end_date,
    };

    it('should return error when data is not enough', async () => {
      const res = await chai.request(app).post('/api/calendar');
      res.status.should.be.equal(500);
      assertError(res.error.text, route_invalid_data);
    });

    it('should create calendar events successfully', async () => {
      const res = await chai.request(app)
        .post('/api/calendar')
        .send(postData);
      res.status.should.be.equal(200);
      res.body.should.be.empty;
    });

    it('should return error when trying to create calendar events on the same slot', async () => {
      const res = await chai.request(app)
        .post('/api/calendar')
        .send(postData);
      res.status.should.be.equal(500);
      assertError(res.error.text, calendar_duplicate_data);
    });
  });

  describe('GET /api/calendar', () => {
    const start_date = moment().startOf('month').toISOString();
    const end_date = moment().add(1, 'months').startOf('month').toISOString();
    const query = qs.stringify({
      start_date,
      end_date,
    });

    it('should return error when required query strings is not provided', async () => {
      const res = await chai.request(app).get('/api/calendar');
      res.status.should.be.equal(500);
      assertError(res.error.text, route_invalid_data);
    });

    it('should return correct calendar events lits', async () => {
      const res = await chai.request(app).get(`/api/calendar?${query}`);
      res.status.should.be.equal(200);
      res.body.length.should.be.equal(1);
      res.body.forEach((item) => {
        item.should.have.keys(['_id', 'title', 'start_date', 'end_date']);
      });
    });
  });
});
