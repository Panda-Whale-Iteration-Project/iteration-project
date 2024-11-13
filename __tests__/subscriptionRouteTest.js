const request = require('supertest');
const server = 'http://localhost:3000';
const mongoose = require('mongoose');
/*
{
"_id":{"$oid":"6733cff09b42db854ae1185b"},
"userId":{"$oid":"6733cf469b42db854ae11849"},
"serviceName":"Chewy",
"amount":{"$numberInt":"100"},
"status":"Active",
"billingCycle": "Monthly",
nextPaymentDate: 2024-12-01T00:00:00.000+00:00",
"category":"Other","notifyDaysBefore":{"$numberInt":"1"},
createdAt: 2024-11-12T22:02:27.421+00:00,
"updatedAt":{"$date":{"$numberLong":"1731448816268"}},
"__v":{"$numberInt":"0"}
}
*/

describe('Subscription Route integration', () => {
  const today = new Date();

  const mockSubscriptionData = [
    {
      userId: 1,
      serviceName: 'abc',
      amount: 20,
      status: 'Active',
      billingCycle: 'Monthly',
      nextPaymentDate: today,
      category: 'Gaming',
      notifyDaysBefore: 3,
      createdAt: today,
      updatedAt: today,
    },
  ];

  // Tamika's Practice Jest & Supertest Test:
  describe('/', () => {
    describe('GET', () => {
      it('should return 200 status code', async () => {
        const res = await request(server).get('/');
        expect(res.statusCode).toBe(200);
      });
    });
  });

  describe('/', () => {
    describe('POST Request Route Testing', () => {
      it('Should add new subscription to the database and return status 200', async () => {
        const mockSubscription = {
          userId: new mongoose.Types.ObjectId().toString(),
          serviceName: 'Test Service',
          amount: 19,
          status: 'Active',
          billingCycle: 'Monthly',
          nextPaymentDate: '2024-11-13T17:56:27.014Z',
          category: 'Security',
          notifyDaysBefore: 3,
        };
        const res = await request(server)
          .post('/subscription')
          .send(mockSubscription);

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject(mockSubscription);
      });

      it('Should  return status 500', async () => {
        const mockInvalidSubscription = {
          userId: new mongoose.Types.ObjectId().toString(),
          serviceName: 'Test Service',
          status: 'Active',
          billingCycle: 'Monthly',
          nextPaymentDate: '2024-11-13T17:56:27.014Z',
          category: 'Security',
          notifyDaysBefore: 3,
        };
        const res = await request(server)
          .post('/subscription')
          .send(mockInvalidSubscription);

        expect(res.status).toBe(500);
      });
    });
  });

  describe('/subscription/:_id', () => {
    describe('PUT', () => {
      it('responds with 200 status and application/json content type', () => {
        const today = new Date();
        const mockSubscriptionData = {
          userId: 1,
          serviceName: 'abc',
          amount: 20,
          status: 'Active',
          billingCycle: 'Monthly',
          nextPaymentDate: today,
          category: 'Gaming',
          notifyDaysBefore: 3,
          createdAt: today,
          updatedAt: today,
        };

        return request(server)
          .put('/subscription/:_id')
          .send(mockSubscriptionData)
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });
  });
});
