define(function(require, exports, module){

  // Load dependence Moudles
  // -------------------
  var _        = require('underscore');
  var Backbone = require('backbone');
  var ui = require('ui');
  var store = require('store');

  var NewsDetail = new Backbone.Model({});

  var PageViewDef = Backbone.View.extend({
    el: "#jQUi",

    events: {
      //'tap #submit_comment': "btnComment",
    },

    NewsDetailTemplate: _.template( $('#tmpl-news-detail').html() ),

    initialize: function()
    {
        NewsDetail.on('change', this.renderNewsDetail, this);
    },

    showArticle: function(id)
    {
      //console.log(locations);
      $.ui.loadContent("#news-detail");
      NewsDetail.url = '/news/getIdNews/'+ id;

      NewsDetail.fetch();

      $("#news-detail-node").html('<div class="current"><p><img src="res/img/loading-a.gif"><span>正在加载中...</span></p></div>');

    },

    // 渲染详细页面
    renderNewsDetail: function(model)
    {
      var _data = model.toJSON();
      _data = _data.body.data;
      //console.log(_data);
      var _html = this.NewsDetailTemplate(_data);

      $("#news-detail-node").html(_html);

    }

  });

  module.exports = new PageViewDef();

});