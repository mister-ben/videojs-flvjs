/**
 * videojs-flvjs
 * @version 0.3.1
 * @copyright 2024 mister-ben <git@misterben.me>
 * @license Apache-2.0
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojsFlvjs = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _video = _interopRequireDefault((typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null));
var _window = _interopRequireDefault(require("global/window"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @file plugin.js
 */

const Html5 = _video.default.getTech('Html5');
const mergeOptions = _video.default.obj ? _video.default.obj.merge : _video.default.mergeOptions || _video.default.util.mergeOptions;
const defaults = {
  mediaDataSource: {},
  config: {}
};

/**
 * Flvjs tech that simply wires up fv.js to a Video.js tech
 *
 * @see {@link https://github.com/bilibili/flv.js|flv.js}
 */
class Flvjs extends Html5 {
  /**
   * Create an instance of this Tech.
   *
   * @param {Object} [options]
   *        The key/value store of player options.
   *
   * @param {Component~ReadyCallback} ready
   *        Callback function to call when the `Flvjs` Tech is ready.
   */
  constructor(options, ready) {
    options = mergeOptions(defaults, options);
    super(options, ready);
  }

  /**
    * Setter for the `Flvjs` Tech's source object.
    *
    * @param {Tech~SourceObject} [src]
    *        The source object to set on the `Flvjs` techs.
    */
  setSrc(src) {
    if (this.flvPlayer) {
      // Is this necessary to change source?
      this.flvPlayer.detachMediaElement();
      this.flvPlayer.destroy();
    }
    const mediaDataSource = this.options_.mediaDataSource;
    const config = this.options_.config;
    mediaDataSource.type = mediaDataSource.type === undefined ? 'flv' : mediaDataSource.type;
    mediaDataSource.url = src;
    this.flvPlayer = _window.default.flvjs.createPlayer(mediaDataSource, config);
    this.flvPlayer.attachMediaElement(this.el_);
    this.flvPlayer.load();
  }

  /**
   * Dispose of flvjs.
   */
  dispose() {
    if (this.flvPlayer) {
      this.flvPlayer.detachMediaElement();
      this.flvPlayer.destroy();
    }
    super.dispose();
  }
}

/**
 * Check if the Flvjs tech is currently supported.
 *
 * @return {boolean}
 *          - True if the Flvjs tech is supported.
 *          - False otherwise.
 */
Flvjs.isSupported = function () {
  return _window.default.flvjs && _window.default.flvjs.isSupported();
};

/**
 * Flvjs supported mime types.
 *
 * @constant {Object}
 */
Flvjs.formats = {
  'video/flv': 'FLV',
  'video/x-flv': 'FLV'
};

/**
 * Check if the tech can support the given type
 *
 * @param {string} type
 *        The mimetype to check
 * @return {string} 'probably', 'maybe', or '' (empty string)
 */
Flvjs.canPlayType = function (type) {
  if (Flvjs.isSupported() && type in Flvjs.formats) {
    return 'maybe';
  }
  return '';
};

/**
 * Check if the tech can support the given source
 *
 * @param {Object} srcObj
 *        The source object
 * @param {Object} options
 *        The options passed to the tech
 * @return {string} 'probably', 'maybe', or '' (empty string)
 */
Flvjs.canPlaySource = function (srcObj, options) {
  return Flvjs.canPlayType(srcObj.type);
};

// Include the version number.
Flvjs.VERSION = '0.3.1';
_video.default.registerTech('Flvjs', Flvjs);
var _default = exports.default = Flvjs;
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"global/window":1}]},{},[2])(2)
});
