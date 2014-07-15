function setupTestHelpers() {
  beforeEach(function() {
    this.sinon = sinon.sandbox.create();
    global.stub = this.sinon.stub.bind(this.sinon);
    global.spy = this.sinon.spy.bind(this.sinon);
  });

  afterEach(function() {
    this.sinon.restore();
    delete global.stub;
    delete global.spy;
  });
}

// when running in node
if (typeof exports !== 'undefined') {
  setupTestHelpers();
}

// when running in browser
else {
  this.global = window;
  mocha.setup('bdd');

  global.expect = chai.expect;

  onload = function() {
    mocha.checkLeaks();
    mocha.globals(['expect', 'sinon', 'stub', 'spy']);
    mocha.run();
    setupTestHelpers();
  };
}
