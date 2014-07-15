(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'underscore', 'ractive'], function(Backbone, _, Ractive) {
      return factory(root, Backbone, _, Ractive);
    });
  } else if (typeof exports !== 'undefined') {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var Ractive = require('ractive');
    module.exports = factory(root, Backbone, _, Ractive);
  } else {
    factory(root, root.Backbone, root._, root.Ractive);
  }

}(this, function(root, Backbone, _, Ractive) {
  'use strict';

  // Backbone.RactiveView
  // --------------------

  var RactiveView = Backbone.RactiveView = function(options) {
    this.cid = _.uniqueId('view');
    options || (options = {});
    _.extend(this, _.pick(options, viewOptions));
    this._setRactive(options);
    this.initialize.apply(this, arguments);
  };

  // Set up inheritance for Ractiveview.
  RactiveView.extend = Backbone.View.extend;

  // List of view options to be merged as properties.
  var viewOptions = ['data', 'el'];

  // Set up all inheritable **Backbone.RactiveView** properties and methods.
  _.extend(RactiveView.prototype, Backbone.Events, {

    $: function(selector) {
      return this.ractive.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    adapt: ['Backbone'],

    render: function() {
      if (!this.el) throw new Error('RactiveView needs `el` before rendering.');
      this.ractive.render(this.el);
      return this;
    },

    // Remove this view by calling ractive#teardown, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.ractive.teardown();
      this.stopListening();
      return this;
    },

    _setRactive: function(options) {
      if (this.ractive) this.ractive.teardown();
      options = _.omit(_.extend({}, this, options), 'el');
      this.ractive = new Ractive(options);
    }

  });

  return RactiveView;

}));
