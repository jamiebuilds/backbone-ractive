(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'underscore'], function(Backbone, _) {
      return factory(root, Backbone, _);
    });
  } else if (typeof exports !== 'undefined') {
    var Backbone = require('backbone');
    var _ = require('underscore');
    module.exports = factory(root, Backbone, _);
  } else {
    factory(root, root.Backbone, root._);
  }

}(this, function(root, Backbone, _) {
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
  var viewOptions = ['data', 'el', 'regions'];

  // Set up all inheritable **Backbone.RactiveView** properties and methods.
  _.extend(RactiveView.prototype, Backbone.Events, {

    $: function(selector) {
      return this.ractive.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    adapt: ['Backbone'],

    render: function(el) {
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
      options = _.extend({}, this, options);
      this.ractive = new Ractive(options);
    }

  });

  return RactiveView;

}));
