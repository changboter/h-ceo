define(function(require, exports, module){

  // Load dependence Moudles
  // -------------------
  var _        = require('underscore');
  var Backbone = require('backbone');
  var ui = require('ui');
  var store = require('store');

  var RecommendList = new Backbone.Model();


  // Define a Cases List view
  // ---------------------
  var PageViewDef = Backbone.View.extend({
    el: "#jQUi",

    RecommendListTemplate: _.template($('#tmpl-recommend-list').html()),
    events: {
      //从其他界面返回main 的时候，如果有浮动筛选层，给清除
//      "tap #tomain": "loadmain"

    },

    initialize: function()
    {
      RecommendList.on('change', this.renderRecommendList, this);
      RecommendList.url = '/magazine/getRecommendMagazineList';
      RecommendList.fetch();
      this.carousel();
    },

    // 个人信息部分
    renderRecommendList: function(list)
    {
      data = list.toJSON();
      _data = data.body.data;

      var _html = this.RecommendListTemplate({"data": _data});
//      console.log(_data);
      //$("#issues-main").append(_html);
    },

    carousel: function(){
      $("#issues-carousel").carousel({
        pagingDiv: "carousel-dots",
        pagingCssName: "carousel_paging2",
        pagingCssNameSelected: "carousel_paging2_selected",
        preventDefaults:false
      });
    }

  });

  new PageViewDef();

});