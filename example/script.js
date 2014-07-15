var Layout = Backbone.RactiveView.extend({
  template: '#layout-template'
});

var ColorsView = Backbone.RactiveView.extend({
  template: '#colors-template'
});

var ColorView = Backbone.RactiveView.extend({
  template: '#color-template'
});

var Router = Backbone.Router.extend({
  initialize: function() {
    this.layout = new Layout({ el: '.app' });
    this.layout.render();

    this.collection = new Backbone.Collection([
      { id: 1, name: 'Red',   hex: '#f00' },
      { id: 2, name: 'Green', hex: '#0f0' },
      { id: 3, name: 'Blue',  hex: '#00f' }
    ]);
  },

  routes: {
    ''    : 'colors',
    ':id' : 'color',
  },

  colors: function() {
    this._cleanup();

    this.view = new ColorsView({
      data: { colors: this.collection },
      el: this.layout.$('article')
    });

    this.view.render();
  },

  color: function(id) {
    this._cleanup();

    this.view = new ColorView({
      data: this.collection.get(id),
      el: this.layout.$('article')
    });

    this.view.render();
  },

  _cleanup: function() {
    if (this.view) {
      this.view.remove();
      delete this.view;
    }
  }
});

var router = new Router();

Backbone.history.start();
