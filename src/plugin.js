/**
 * @file plugin.js
 */

import videojs from 'video.js';
import flvjs from 'flv.js';

const Html5 = videojs.getTech('Html5');
const mergeOptions = videojs.mergeOptions || videojs.util.mergeOptions;
const defaults = {
  mediaDataSource: {},
  config: {}
};

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
    * A getter/setter for the `Flvjs` Tech's source object.
    *
    * @param {Tech~SourceObject} [src]
    *        The source object you want to set on the `Flvjs` techs.
    *
    * @return {Tech~SourceObject|undefined}
    *         - The current source object when a source is not passed in.
    *         - undefined when setting
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
    this.flvPlayer = flvjs.createPlayer(mediaDataSource, config);
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
Flvjs.isSupported = function() {

  return flvjs.isSupported();
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
Flvjs.canPlayType = function(type) {
  if (Flvjs.isSupported() && type in Flvjs.formats) {
    return 'maybe';
  }

  return '';
};

/**
 * Check if the tech can support the given source
 * @param {Object} srcObj
 *        The source object
 * @param {Object} options
 *        The options passed to the tech
 * @return {string} 'probably', 'maybe', or '' (empty string)
 */
Flvjs.canPlaySource = function(srcObj, options) {
  return Flvjs.canPlayType(srcObj.type);
};

// Include the version number.
Flvjs.VERSION = '__VERSION__';

videojs.registerTech('Flvjs', Flvjs);

export default Flvjs;
