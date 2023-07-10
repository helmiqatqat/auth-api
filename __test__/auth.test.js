'use strict';

process.env.SECRET = "secretstring";

const { db } = require('../src/auth/models/index')
const supertest = require('supertest');
const {server} = require('../src/server');


const mockRequest = supertest(server);

let userData = {
  testUser: { username: 'user', password: 'password' },
};
let accessToken = null;

beforeAll(async () => {
  await db.sync();
});


describe('Auth Router', () => {

  it('POST /signup creates a new user and sends an object with the user and the token to the client.', async () => {

    const response = await mockRequest.post('/signup').send(userData.testUser);
    const userObject = response.body;

    expect(response.status).toBe(201);
    expect(userObject.token).toBeDefined();
    expect(userObject.user.id).toBeDefined();
    expect(userObject.user.username).toEqual(userData.testUser.username);
  });

  it('POST /signin with basic authentication headers logs in a user and sends an object with the user and the token to the client.', async () => {
    let { username, password } = userData.testUser;

    const response = await mockRequest.post('/signin')
      .auth(username, password);

    const userObject = response.body;
    expect(response.status).toBe(201);
    expect(userObject.token).toBeDefined();
    expect(userObject.user.id).toBeDefined();
    expect(userObject.user.username).toEqual(username);
  });});



afterAll(async () => {
  await db.drop();
});