const chai = require('chai');
const moment = require('moment');
const qs = require('querystring');

const {
  app,
  assertError,
  errors,
  models,
} = chai;
const { route_invalid_data, duplicate_event_exsists } = errors;
const { Calendar } = models;
const should = chai.should();


describe('Calendar Router', () => {
  let calendarId = null;
  const currentStartDate = moment().toISOString();
  const currentEndDate = moment().add(1, 'days').toISOString();
  const previousStartDate = moment().subtract(2, 'day').toISOString();
  const previousEndDate = moment().subtract(1, 'day').toISOString();
  before(async () => {
    const result = await Calendar.create({
      title: 'previous-calendar',
      start_date: previousStartDate,
      end_date: previousEndDate,
    });
    result.toObject().should.includes.keys(['_id', 'title', 'created_at', 'updated_at', 'start_date', 'end_date']);
    calendarId = result._id;
  });

  after(async () => {
    await Calendar.deleteMany();
    const result = await Calendar.findOne();
    should.equal(result, null);
  });

  describe('POST /api/calendar', () => {
    const postData = {
      title: 'title',
      start_date: currentStartDate,
      end_date: currentEndDate,
    };

    it('should return error when data is not enough', async () => {
      const res = await chai.request(app).post('/api/calendar');
      res.status.should.be.equal(400);
      assertError(res.error.text, route_invalid_data);
    });

    it('should return error when start_date is greater than end_date', async () => {
      const invalidPostData = {
        title: 'title',
        start_date: moment().add(1, 'days').toISOString(),
        end_date: moment().toISOString(),
      };
      const res = await chai.request(app).post('/api/calendar').send(invalidPostData);
      res.status.should.be.equal(400);
      assertError(res.error.text, route_invalid_data);
    });

    it('should create calendar events successfully', async () => {
      const res = await chai.request(app)
        .post('/api/calendar')
        .send(postData);
      res.status.should.be.equal(200);
      res.body.should.includes.keys(['_id']);
    });

    it('should return error when trying to create calendar events on the same slot', async () => {
      const res = await chai.request(app)
        .post('/api/calendar')
        .send(postData);
      res.status.should.be.equal(400);
      assertError(res.error.text, duplicate_event_exsists);
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
      res.status.should.be.equal(400);
      assertError(res.error.text, route_invalid_data);
    });

    it('should return correct calendar events lits', async () => {
      const res = await chai.request(app).get(`/api/calendar?${query}`);
      res.status.should.be.equal(200);
      res.body.forEach((item) => {
        item.should.have.keys(['_id', 'title', 'start_date', 'end_date']);
      });
    });
  });

  describe('PUT /api/calendar', () => {
    it('should return error if invalid ObjectId is provided', async () => {
      const fakeId = 'fakeId';
      const res = await chai.request(app).put(`/api/calendar/${fakeId}`);
      res.status.should.be.equal(400);
      assertError(res.error.text, route_invalid_data);
    });

    it('should return error if nothing exsist in request body', async () => {
      const res = await chai.request(app).put(`/api/calendar/${calendarId}`);
      res.status.should.be.equal(400);
      assertError(res.error.text, route_invalid_data);
    });

    it('should return error when start_date is greater than end_date', async () => {
      const invalidPutData = {
        title: 'title',
        start_date: moment().add(1, 'days').toISOString(),
        end_date: moment().toISOString(),
      };
      const res = await chai.request(app).put(`/api/calendar/${calendarId}`).send(invalidPutData);
      res.status.should.be.equal(400);
      assertError(res.error.text, route_invalid_data);
    });

    it('should return error if the calendar events already exsists on the slot', async () => {
      const putData = {
        title: 'new title',
        start_date: currentStartDate,
        end_date: currentEndDate,
      };
      const res = await chai.request(app).put(`/api/calendar/${calendarId}`).send(putData);
      res.status.should.be.equal(400);
      assertError(res.error.text, duplicate_event_exsists);
    });

    it('should update the calendar event if valid data is provided', async () => {
      const newStartDate = moment().add(2, 'days').toISOString();
      const newEndDate = moment().add(3, 'days').toISOString();
      const putData = {
        title: 'new title',
        start_date: newStartDate,
        end_date: newEndDate,
      };
      const res = await chai.request(app).put(`/api/calendar/${calendarId}`).send(putData);
      res.status.should.be.equal(200);
      res.body.should.be.empty;
    });
  });

  describe('DELETE /api/calendar/:id', () => {
    it('should return error when invalid ObjectId is provided', async () => {
      const fakeId = 'fakedId';
      const res = await chai.request(app).delete(`/api/calendar/${fakeId}`);
      res.status.should.be.equal(400);
      assertError(res.error.text, route_invalid_data);
    });

    it('should delete the calendar events successfully', async () => {
      const res = await chai.request(app).delete(`/api/calendar/${calendarId}`);
      res.status.should.be.equal(200);
      res.body.should.empty;
    });
  });
});
