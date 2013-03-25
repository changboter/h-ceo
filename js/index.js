define(function(require, exports, module){

  // Load dependence Moudles
  // -------------------
  var _        = require('underscore');
  var Backbone = require('backbone');
  var store    = require('store');
  var ui       = require('ui');


  var IndexViewDef = Backbone.View.extend({
    'el': '#wrapper',
    events: {
      'click #ucenter': 'isLogin'
    },

    isLogin: function()
    {
      var userinfo = store.get('userinfo');

      // 已登录
      if(userinfo)
      {
      	location.href = './usercenter.html#usercenter';
      }
      else
      {
      	location.href = './usercenter.html#login';
      }

    }


  });


   new IndexViewDef();


});