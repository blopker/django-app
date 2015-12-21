'use strict';

let assert = require('assert');

describe('smoke tests', function() {
  it('should load index', function *() {
    yield browser
        .url('/');
    let html = yield browser.getSource();
    assert(html.includes('Index'));
  });

  it('should load about', function *() {
    yield browser
        .url('/about/');
    let html = yield browser.getSource();
    assert(html.includes('About'));
  });
});
