import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { Test } from '@nestjs/testing';
import { AuthModule } from '../../src/modules/auth/auth.module';
import { InitDb, CleanFakeUser } from '../helper/e2e.helper';

describe('Authentication', () => {
  let token;
  const server = express();
  server.use(bodyParser.json());

  const fakeUser = {
    email: 'testauth@gmail.com',
    password: 'thomas1'
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      modules: [AuthModule]
    }).compile();

    const app = module.createNestApplication(server);
    app.setGlobalPrefix('api/v1');
    await app.init();

    await InitDb(mongoose);
  });

  afterAll(async () => {
    CleanFakeUser(mongoose, fakeUser);
    await mongoose.disconnect();
  });

  it('Should create an account and return a token', async () => {
    const response = await request(server)
      .post('/api/v1/auth/register')
      .send(fakeUser);
    expect(response.status).toEqual(201);
    expect(response.type).toEqual('application/json');
    expect(response.body).toHaveProperty('access_token');
  });

  it('Should get a token', async () => {
    const response = await request(server)
      .post('/api/v1/auth/login')
      .send(fakeUser);
    token = response.body.access_token;
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toHaveProperty('access_token');
  });

  it(`Shouldn't get a token (empty email)`, async () => {
    const response = await request(server)
      .post('/api/v1/auth/login')
      .send({ password: fakeUser.password });
    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/json');
  });

  it(`Shouldn't get a token (empty password)`, async () => {
    const response = await request(server)
      .post('/api/v1/auth/login')
      .send({ email: fakeUser.email });
    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/json');
  });

  it(`Shouldn't get a token (wrong email)`, async () => {
    const response = await request(server)
      .post('/api/v1/auth/login')
      .send({ email: fakeUser.email, password: 'wrongpassword' });
    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/json');
  });

  it(`Shouldn't get a token (wrong password)`, async () => {
    const response = await request(server)
      .post('/api/v1/auth/login')
      .send({ email: 'wrongemail@gmail.com', password: fakeUser.password });
    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/json');
  });

  it(`Shouldn't get a token (wrong email & password)`, async () => {
    const response = await request(server)
      .post('/api/v1/auth/login')
      .send({ email: 'wrongemail@gmail.com', password: 'wrongpassword' });
    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/json');
  });
});
