/* eslint-disable */
const chai = require("chai");
const chaiJsonEqual = require("chai-json-equal");
const { expect } = require("chai");
const emailSuccessRequest = require("./payloads/emailSuccess");
const emailValidation1 = require("./payloads/emailValidation1");
const emailValidation2 = require("./payloads/emailValidation2");
const emailFailOver = require("./payloads/emailFailOver");
const emailValidationErrorResponse1 = require("./payloads/emailValidationErrorResponse1");
const emailValidationErrorResponse2 = require("./payloads/emailValidationErrorResponse2");

const app = require("../app");
chai.use(require("chai-http"));
chai.use(chaiJsonEqual);

describe("email-success", function() {
  this.timeout(4000);
  before(() => {});
  after(() => {});

  it("should return 200 on successful email send", () =>
    chai
      .request(app)
      .post("/api/v1/email/send")
      .send(emailSuccessRequest)
      .then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      }));
});

describe("email-validation", function() {
  this.timeout(4000);
  before(() => {});
  after(() => {});

  it("should check validations and return appropriate error ", () =>
    chai
      .request(app)
      .post("/api/v1/email/send")
      .send(emailValidation1)
      .then(res => {})
      .catch(err => {
        err.response.should.have.status(400);
        err.response.body.should.have.property("error");
        err.response.body.error.should.jsonEqual(emailValidationErrorResponse2);
        done();
      }));

  it("should check atleast one email in To Field, check correct format for cc, bcc and return appropriate error ", () =>
    chai
      .request(app)
      .post("/api/v1/email/send")
      .send(emailValidation2)
      .then(res => {})
      .catch(err => {
        err.response.should.have.status(400);
        err.response.body.should.have.property("error");
        err.response.body.error.should.jsonEqual(emailValidationErrorResponse2);
        done();
      }));
});

describe("email-failover", function() {
  this.timeout(4000);
  before(() => {});
  after(() => {});

  it("should return 200 on successful email send after failover to second email provider", () =>
    chai
      .request(app)
      .post("/api/v1/email/send")
      .send(emailFailOver)
      .then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      }));
});
