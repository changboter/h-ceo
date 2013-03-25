// module loader
// ------------------------------------------------
;(function(m, o, d, u, l, a, r) {
  if(m[d]) return;
  function f(n, t) { return function() { r.push(n, arguments); return t } }
  m[d] = a = { args: (r = []), config: f(0, a), use: f(1, a) };
  m.define = f(2);
  u = o.createElement('script');
  u.id = d + 'node';
  u.src = './js/base/sea-1.2.1.js';
  l = o.getElementsByTagName('head')[0];
  a = o.getElementsByTagName('base')[0];
  a ? l.insertBefore(u, a) : l.appendChild(u);
})(window, document, 'seajs');

var _filename = window.location.pathname.slice(window.location.pathname.lastIndexOf('/')+1, -5);

// load page moudle
seajs.use('./js/'+ _filename +'.js');
seajs.config({ 'debug': 2});


// load mobinweaver
seajs.use('./mobinweaverlibs/mobinweaver.js', function(){
  if(typeof MobinWeaver === "undefined") return false;

  MobinWeaver.UIScreen.setStatusBarVisible(MobinWeaver.UIScreen.SCREEN_STATUSBAR_SHOWN);
  MobinWeaver.KeyManager.addKeyListener(MobinWeaver.KeyManager.BACK_KEY, function(){
    if(_filename == 'index'){
      if(window.confirm('您确认要退出吗？')) { MobinWeaver.exit(); }
    }
    else {
      if($.ui.history.length>0) $.ui.goBack();
      else window.location.href = './index.html';
    }

  });
});


// include touch.js on desktop browsers for debug
// --------------------------------------------
if (!((window.DocumentTouch && document instanceof DocumentTouch) || 'ontouchstart' in window)){
  var script = document.createElement("script");
  script.src = "./js/touch.js";
  var tag = $("head").append(script);
  $.os.android = true;
  $.os.desktop = true;
}


// start app
// ----------------------------------------------------------------------------------------

// default webroot
// var webRoot = "./";

// By default, it is set to true and you're app will run right away.
// We set it to false to show a splashscreen
// $.ui.autoLaunch = true;

if($.ui) $.ui.loadDefaultHash = true;
// $.ui.showBackbutton = false;
// $.ui.removeFooterMenu();

// This will run when the body is loaded
// document.addEventListener("DOMContentLoaded", function() {

//   // We override the back button text to always say "Back"
//   $.ui.backButtonText = "返回";

//   // We wait 1.5 seconds to call $.ui.launch after DOMContentLoaded fires
//   window.setTimeout(function () {
//       $.ui.launch();
//   }, 1500);

// }, false);

// This function will get executed when $.ui.launch has completed
// $.ui.ready(function ()
// {

// });


// device ready
// document.addEventListener("appMobi.device.ready", function() {
//   AppMobi.device.setRotateOrientation("portrait");
//   AppMobi.device.setAutoRotate(false);
//   webRoot = AppMobi.webRoot + "/";

//   // hide splash screen
//   AppMobi.device.hideSplashScreen();
// }, false);