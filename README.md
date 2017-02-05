# videojs-flvjs

Video.js tech to use [flv.js](https://github.com/Bilibili/flv.js) for FLV playback using MSE instead of Flash.

Check out the flv.js docs for details on its capabilities, browser support etc. Note that you need [CORS headers](https://github.com/Bilibili/flv.js/blob/master/docs/cors.md) if your video is being hosted at a different origin.

[Example](https://github.com/mister-ben/videojs-flvjs)

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
  var player = videojs('my-video', {
    techOrder: {['html5', 'flvjs']}
  });
</script>
```

You only need to set the techOrder in Video.js version 5. In version 6 techs add themselves to the default techorder. If you are using both the flash and flvjs techs, flvjs should come first.

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

Apache-2.0. Copyright (c) mister-ben

[videojs]: http://videojs.com/
