import document from 'global/document';
import window from 'global/window';

import QUnit from 'qunit';
import sinon from 'sinon';
import videojs from 'video.js';

import plugin from '../src/plugin';

QUnit.test('the environment is sane', function(assert) {
  assert.strictEqual(typeof Array.isArray, 'function', 'es5 exists');
  assert.strictEqual(typeof sinon, 'object', 'sinon exists');
  assert.strictEqual(typeof videojs, 'function', 'videojs exists');
  assert.strictEqual(typeof plugin, 'function', 'plugin is a function');
});

QUnit.module('videojs-flvjs', {

  beforeEach() {

    // Mock the environment's timers because certain things - particularly
    // player readiness - are asynchronous in video.js 5. This MUST come
    // before any player is created; otherwise, timers could get created
    // with the actual timer methods!
    this.clock = sinon.useFakeTimers();

    this.fixture = document.getElementById('qunit-fixture');
    this.video = document.createElement('video');
    this.fixture.appendChild(this.video);
    this.player = videojs(this.video);
  },

  afterEach() {
    this.player.dispose();
    this.clock.restore();
  }
});

QUnit.test('can play flv source', function(assert) {
  assert.expect(2);

  // Fake the presence of flv.js and that it's on a supported browser
  window.flvjs = {};
  window.flvjs.isSupported = function() {
    return true;
  };

  assert.ok(
    plugin.canPlaySource({type: 'video/flv' }, {}),
    'video/flv supported'
  );
  assert.ok(
    plugin.canPlaySource({type: 'video/x-flv' }, {}),
    'video/x-flv supported'
  );

  delete window.flvjs;
});
