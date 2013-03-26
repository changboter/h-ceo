define(function(require, exports, module){

  // Load dependence Moudles
  // -------------------
  var _        = require('underscore');
  var Backbone = require('backbone');
  var ui = require('ui');
  var store = require('store');

  // 所有案例
  var NewsListModel = Backbone.Model.extend({});
  var NewsListCollection = Backbone.Collection.extend({
    model: NewsListModel,
    setPage: function(page)
    {
      this.url = '/news/getNewsList/'+ page;
      return this;
    },

    initialize: function()
    {
      this.setPage(1);
    }
  });
  NewsList = new NewsListCollection();
  window.NewsList = NewsList;

  var PageViewDef = Backbone.View.extend({
    el: "#news-list",
    events: {
      "tap #news-list .load-more": "loadMore",
      "tap #news-list #news-list-node li": "showDetail"
    },

    homeNewsListTemplate: _.template($('#tmpl-news-list').html()),

    initialize: function()
    {
      $.ui.showMask("正在加载...");
      NewsList.on('reset', this.renderNewsList, this);
      this.page = 1;
      this.pull();
    },


    // 拉取数据
    pull: function()
    {
      NewsList.setPage( this.page++ ).fetch({
        success: function(){
          $.ui.hideMask();
          $("#news-list #news-list-load").html('<div class="load-more"><p>查看更多</p></div>');
        },
        error: function(){
          $.ui.hideMask();
          $.ui.popup({
            "title": "错误信息",
            "message": "服务器异常, 或许数据解析错误，请稍候重试！",
            "doneText": "确认",
            "doneCallback": function(){},
            "cancelText":"取消"
          });
        }
      });
    },

    // 渲染首页列表
    renderNewsList: function(list)
    {
      data = list.toJSON();
      data = data[0].body.data;
      console.log(data.length);
      var _html = this.homeNewsListTemplate({"data": data});
      $("#news-list-node").append(_html);

      if(data.length === 0 || data.length < 10)
      {
        $("#news-list .load-more").hide();
        // return false;
      }

    },

    // when touchstart load more
    loadMore: function()
    {
      $("#news-list #news-list-load").html('<div class="current"><p><img src="res/img/loading.gif"><span>查看更多</span></p></div>');
      this.pull();
    },

    showDetail: function(e)
    {
      var _e = $(e.currentTarget);

      var _id = _e.attr('data-id');

      require.async('./news-detail', function(mod){
        mod.showArticle(_id);
      });
    }

  });

  new PageViewDef();

});