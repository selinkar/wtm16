'use strict';

/*
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/* global page */

// We use Page.js for routing. This is a Micro
// client-side router inspired by the Express router
// More info: https://visionmedia.github.io/page.js/

// Sets app default base URL
var baseUrl = '/';

if (window.location.port === '') {
  // if production
  // Uncomment baseURL below and
  // set baseURL to '/your-pathname/' if running from folder in production
  // baseUrl = '/polymer-starter-kit-plus/';

  // Removes end / from baseUrl which page.base requires for production
  page.base(baseUrl.replace(/\/$/, ''));
}

var app = document.getElementById('app');

window.addEventListener('upgraded', function () {
  app.baseUrl = baseUrl;
});

// Utility function to listen to an event on a node once.
function once(node, event, fn, args) {
  var self = this;
  var listener = function listener() {
    fn.apply(self, args);
    node.removeEventListener(event, listener, false);
  };
  node.addEventListener(event, listener, false);
}

// Middleware
function scrollToTop(ctx, next) {
  function setData() {
    app.scrollPageToTop();
  }

  // Check if element prototype has not been upgraded yet
  if (!app.upgraded) {
    once(app, 'upgraded', setData);
  } else {
    setData();
  }
  next();
}

function closeDrawer(ctx, next) {
  function setData() {
    app.closeDrawer();
  }

  // Check if element prototype has not been upgraded yet
  if (!app.upgraded) {
    once(app, 'upgraded', setData);
  } else {
    setData();
  }
  next();
}

function setFocus(selected) {
  document.querySelector('section[data-route="' + selected + '"]').focus();
}

// Routes
page('*', scrollToTop, closeDrawer, function (ctx, next) {
  app.fire('iron-signal', { name: 'track-page', data: { path: ctx.path } });
  next();
});

function setHomePage() {
  function setData() {
    app.route = 'home';
    setFocus(app.route);
  }

  // Check if element prototype has not been upgraded yet
  if (!app.upgraded) {
    once(app, 'upgraded', setData);
  } else {
    setData();
  }
}

page('/', function () {
  setHomePage();
});

page(baseUrl, function () {
  setHomePage();
});

page('/blog', function () {
  function setData() {
    app.route = 'blog';
    setFocus(app.route);
  }

  // Check if element prototype has not been upgraded yet
  if (!app.upgraded) {
    once(app, 'upgraded', setData);
  } else {
    setData();
  }
});

page('/blog/:id', function (ctx) {
  function setData() {
    app.route = 'post';
    app.params = ctx.params;
    setFocus(app.route);
  }

  // Check if element prototype has not been upgraded yet
  if (!app.upgraded) {
    once(app, 'upgraded', setData);
  } else {
    setData();
  }
});

page('/speakers', function () {
  function setData() {
    app.route = 'speakers';
    setFocus(app.route);
  }

  // Check if element prototype has not been upgraded yet
  if (!app.upgraded) {
    once(app, 'upgraded', setData);
  } else {
    setData();
  }
});

page('/speakers/:id', function (ctx) {
  function setData() {
    app.route = 'speakers';
    app.params = ctx.params;
    setFocus(app.route);
  }

  // Check if element prototype has not been upgraded yet
  if (!app.upgraded) {
    once(app, 'upgraded', setData);
  } else {
    setData();
  }
});

page('/schedule', function () {
  function setData() {
    app.route = 'speakers';
    setFocus(app.route);
  }

  // Check if element prototype has not been upgraded yet
  if (!app.upgraded) {
    once(app, 'upgraded', setData);
  } else {
    setData();
  }
});

page('/schedule/:id', function (ctx) {
  function setData() {
    app.route = 'speakers';
    app.params = ctx.params;
    setFocus(app.route);
  }

  // Check if element prototype has not been upgraded yet
  if (!app.upgraded) {
    once(app, 'upgraded', setData);
  } else {
    setData();
  }
});

// 404
page('*', function (ctx) {
  function setData() {
    var url = ctx.path.substr(1);
    app.$.confirmToast.text = 'Can\'t find: ' + url + '. Redirected you to Home Page';
    app.$.confirmToast.show();
    page.redirect(baseUrl);
  }

  // Check if element prototype has not been upgraded yet
  if (!app.upgraded) {
    once(app, 'upgraded', setData);
  } else {
    setData();
  }
});

page({
  // add #! before urls
  // https://developers.google.com/webmasters/ajax-crawling/docs/learn-more
  // Disable for Firebase or GAE
  hashbang: false
});
//# sourceMappingURL=routing.js.map
