# videojs-flvjs

Video.js tech to use [flv.js](https://github.com/Bilibili/flv.js) FLV playback in MSE. Check out the flv.js docs for details on browser support etc.

## Installation

```sh
npm install --save videojs-flvjs
```

## Usage

To include videojs-flvjs on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available. You also need to include [flv.js](https://github.com/Bilibili/flv.js).

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/flv.js"></script>
<script src="//path/to/videojs-flvjs.min.js"></script>
<script>
  var player = videojs('my-video');
</script>
```

### Browserify

When using with Browserify, install videojs-flvjs via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-flvjs');

var player = videojs('my-video');

player.flvjs();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-flvjs'], function(videojs) {
  var player = videojs('my-video');

  player.flvjs();
});
```

## License

Apache-2.0. Copyright (c) mister-ben &lt;git@misterben.me&gt;


[videojs]: http://videojs.com/
