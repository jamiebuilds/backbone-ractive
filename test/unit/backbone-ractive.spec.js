describe('Backbone.RactiveView', function() {
  it('should contain Backbone.Events', function() {
    expect(Backbone.RactiveView.prototype).to.contain(Backbone.Events);
  });

  it('should have #extend', function() {
    expect(Backbone.RactiveView).to.have.property('extend', Backbone.View.extend);
  });

  describe('::constructor', function() {
    describe('when called', function() {
      beforeEach(function() {
        this.options = { options: true };
        spy(Backbone.RactiveView.prototype, '_setRactive');
        spy(Backbone.RactiveView.prototype, 'initialize');
        this.view = new Backbone.RactiveView(this.options);
      });

      it('should set the "cid"', function() {
        expect(this.view)
          .to.have.property('cid');
      });

      it('should call ::_setRactive', function() {
        expect(this.view._setRactive)
          .to.have.been.calledWith(this.options);
      });

      it('should call ::initialize', function() {
        expect(this.view.initialize)
          .to.have.been.calledWith(this.options);
      });
    });

    describe('when called with no "options"', function() {
      beforeEach(function() {
        this.view = new Backbone.RactiveView();
      });

      it('should not attach any "viewOptions"', function() {
        expect(this.view)
          .not.to.have.ownProperty('data');
        expect(this.view)
          .not.to.have.ownProperty('el');
      });
    });

    describe('when called with "options"', function() {
      beforeEach(function() {
        this.options = {
          data : stub(),
          el   : stub(),
          foo  : stub()
        };

        this.view = new Backbone.RactiveView(this.options);
      });

      it('should not attach any "viewOptions"', function() {
        expect(this.view)
          .to.have.ownProperty('data', this.options.data);
        expect(this.view)
          .to.have.ownProperty('el', this.options.el);
        expect(this.view)
          .not.to.have.ownProperty('foo');
      });
    });
  });

  describe('::$', function() {
    beforeEach(function() {
      this.view = new Backbone.RactiveView();
      stub(this.view.ractive, 'find');
      this.view.$('foo');
    });

    it('should proxy to Ractive::find', function() {
      expect(this.view.ractive.find)
        .to.have.been.calledWith('foo');
    });
  });

  describe('::render', function() {
    describe('when called on view without an "el"', function() {
      beforeEach(function() {
        this.view = new Backbone.RactiveView();
      });

      it('should proxy to Ractive::find', function() {
        expect(this.view.render.bind(this.view))
          .to.throw(Error, 'RactiveView needs `el` before rendering.');
      });
    });

    describe('when called on view with an "el"', function() {
      beforeEach(function() {
        this.view = new Backbone.RactiveView({ el: 'foo' });
        stub(this.view.ractive, 'render');
        this.view.render();
      });

      it('should proxy to Ractive::render', function() {
        expect(this.view.ractive.render)
          .to.have.been.calledWith(this.view.el);
      });
    });
  });

  describe('::remove', function() {
    beforeEach(function() {
      this.view = new Backbone.RactiveView({ el: 'foo' });
      stub(this.view.ractive, 'teardown');
      stub(this.view, 'stopListening');
      this.view.remove();
    });

    it('should proxy to Ractive::teardown', function() {
      expect(this.view.ractive.teardown)
        .to.have.been.calledOnce;
    });

    it('should call ::stopListening', function() {
      expect(this.view.stopListening)
        .to.have.been.calledOnce;
    });
  });

  describe('::_setRactive', function() {
    describe('when called', function() {
      beforeEach(function() {
        this.view = new Backbone.RactiveView({ el: 'foo' });
        this.options = { foo: 'bar' };
        this.fullOptions = _.extend({}, this.view, this.options);
        this.view._setRactive(this.options);
      });

      it('should create a new Ractive with the correct "options"', function() {
        expect(this.view.ractive._config.options)
          .to.contain(this.fullOptions);
      });
    });

    describe('when called on view with "ractive"', function() {
      beforeEach(function() {
        this.view = new Backbone.RactiveView({ el: 'foo' });
        this.teardownSpy = spy(this.view.ractive, 'teardown');
        this.view._setRactive();
      });

      it('should teardown the previous ractive instance', function() {
        expect(this.teardownSpy)
          .to.have.been.calledOnce;
      });
    });
  });
});
