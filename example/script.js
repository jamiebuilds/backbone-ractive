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
    ''           : 'index',
    'colors'     : 'colors',
    'colors/:id' : 'color',
  },

  index: function() {
    this.navigate('colors', { trigger: true });
  },

  colors: function() {
    var colorsView = new ColorsView({
      data: { colors: this.collection },
      el: this.layout.$('article')
    });

    this.render(colorsView);
  },

  color: function(id) {
    var colorView = new ColorView({
      data: this.collection.get(id),
      el: this.layout.$('article')
    });

    this.render(colorView);
  },

  render: function(view) {
    if (this.currentView) {
      this.currentView.remove();
    }
    this.currentView = view;
    this.currentView.render();
  }
});

var router = new Router();

Backbone.history.start();
