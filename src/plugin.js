/**
 * @file plugin.js
 */

import videojs from 'video.js';

const Html5 = videojs.getTech('Html5');

class Flvjs extends Html5 {

   /**
    * A getter/setter for the `Flash` Tech's source object.
    *
    * @param {Tech~SourceObject} [src]
    *        The source object you want to set on the `Flash` techs.
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
    this.flvPlayer = window.flvjs.createPlayer({
      type: 'flv',
      url: src,
      cors: true,
      hasAudio: false
    });
    this.flvPlayer.attachMediaElement(this.el_);
    this.flvPlayer.load();
  }

  /**
   * Dispose of flvjs.
   */
  dispose() {
    this.flvPlayer.detachMediaElement();
    this.flvPlayer.destroy();
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

  return window.flvjs && window.flvjs.isSupported();
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
