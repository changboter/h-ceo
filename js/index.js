define(function(require, exports, module){

  // Load dependence Moudles
  // -------------------
  var _        = require('underscore');
  var Backbone = require('backbone');

  require.async('./news-list');
  require.async('./news-detail');

});