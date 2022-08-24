import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const mockUser = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

const mockToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkeGkuSHhrMWN6QU8wblpSLi5CMzkzdTEwYUVEMFJRMU4zUEFFWFE3SHh0TGpLUEVaQnUuUFciLCJpYXQiOjE2NjEzMDM4MTF9.npZ776-rUubCg25RHgvS8uGwdbt-_xqxhzcT3OCSYD0';

describe('Testing Login Route', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon.stub(User, 'findOne').resolves(mockUser as unknown as User);
  });

  afterEach(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it('can login when we use email and password', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });

    const { token } = chaiHttpResponse.body;
    const { status } = chaiHttpResponse;

    expect(status).to.equal(200);
    expect(token).to.exist;
  });

  it('tests if password is empty', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: '',
    });

    const { message } = chaiHttpResponse.body;
    const { status } = chaiHttpResponse;

    expect(status).to.equal(400);
    expect(message).to.equal('All fields must be filled');
  });

  it('tests if password is incorrect', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'incorrect_password',
    });

    const { message } = chaiHttpResponse.body;
    const { status } = chaiHttpResponse;

    expect(status).to.equal(400);
    expect(message).to.equal('Incorrect email or password');
  });

  it('tests if the token is not valid', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login/validate')
      .set('authorization', mockToken)
      .send();

    const { role } = chaiHttpResponse.body;
    const { status } = chaiHttpResponse;

    expect(role).to.equal('admin');
    expect(status).to.equal(200);
  });

  it('tests if the token is found', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login/validate')
      .send();

    const { status } = chaiHttpResponse;

    expect(status).to.equal(404);
  });
});
