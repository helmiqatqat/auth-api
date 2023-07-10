'use strict';
const { server } = require('../src/server');
const { db } = require('../src/auth/models/index');
const supertest = require('supertest');
const mockServerMethods = supertest(server);

beforeAll(async () => {
    await db.sync();
});

describe('V1 (Unauthenticated API) routes', () => {

    it('Create a record using POST', async () => {
        const response = await mockServerMethods.post('/api/v1/food').send({
            name: 'mansaf',
            calories: 1,
            type: 'fruit'
        });
        expect(response.status).toBe(201);
    });
    it('Read a list of records using GET', async () => {
        const response = await mockServerMethods.get('/api/v1/food');
        expect(response.status).toBe(200);
    });
    it('Read a record using GET', async () => {
        const response = await mockServerMethods.get('/api/v1/food/1');
        expect(response.status).toBe(200);
    });
    it('Update a record using PUT', async () => {
        const response = await mockServerMethods.put('/api/v1/food/1');
        expect(response.status).toBe(201);
    });
    it('Destroy a record using DELETE', async () => {
        const response = await mockServerMethods.delete('/api/v1/food/1');
        expect(response.status).toBe(204);
    });
    //////////////////////////////////////////////////////////////////////////////////
    it('Create a record using POST', async () => {
        const response = await mockServerMethods.post('/api/v1/clothes').send({
            name: 'T-shirt',
            color: 'red',
            size:'xLarge'
        });
        expect(response.status).toBe(201);
    });
    it('Read a list of records using GET', async () => {
        const response = await mockServerMethods.get('/api/v1/clothes');
        expect(response.status).toBe(200);
    });
    it('Read a record using GET', async () => {
        const response = await mockServerMethods.get('/api/v1/clothes/1');
        expect(response.status).toBe(200);
    });
    it('Update a record using PUT', async () => {
        const response = await mockServerMethods.put('/api/v1/clothes/1');
        expect(response.status).toBe(201);
    });
    it('Destroy a record using DELETE', async () => {
        const response = await mockServerMethods.delete('/api/v1/clothes/1');
        expect(response.status).toBe(204);
    });
});

afterAll(async () => {
    await db.drop();
});
