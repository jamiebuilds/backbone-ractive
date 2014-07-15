if (!global.document || !global.window) {
  var jsdom = require('jsdom').jsdom;

  global.document = jsdom('<html><head><script></script></head><body></body></html>', null, {
    FetchExternalResources   : ['script'],
    ProcessExternalResources : ['script'],
    MutationEvents           : '2.0',
    QuerySelector            : false
  });

  global.window = document.createWindow();
  global.navigator = global.window.navigator;
}

var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

global._ = require('underscore');
global.Backbone = require('backbone');
global.expect = chai.expect;
global.sinon = sinon;

require('../../backbone-ractive');
