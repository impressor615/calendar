const Promise = require('bluebird');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

global.Promise = Promise;
chai.should();
chai.use(chaiHttp);
chai.app = app;
