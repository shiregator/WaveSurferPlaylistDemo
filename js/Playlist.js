﻿{
  /*! wavesurfer.js 1.4.0 (Mon, 10 Apr 2017 08:55:36 GMT)
* https://github.com/katspaugh/wavesurfer.js
* @license BSD-3-Clause */!
  function (a, b) {
    "function" == typeof define && define.amd ? define(["wavesurfer"],

    function (a) { return b(a) }) : "object" == typeof exports ?

    module.exports = b(require("wavesurfer.js")) : b(WaveSurfer)
  }

  (this, function (a) {
    "use strict"; a.Playlist = {

      init: function (a) {

        this.params = a; var b = this.wavesurfer = a.wavesurfer;


        if (!this.wavesurfer) throw new Error("No WaveSurfer instance provided");

        if (this.playlistFileGET = this.params.playlistFile || null, this.playlistType = this.params.playlistType || "m3u", this.playlistData = [], null == this.playlistFileGET)

          throw new Error("No playlist file provided");


        var c = b.util.ajax({ url: this.playlistFileGET, responseType: "text" }),

          d = this; c.on("success", function (a, b) { d.loadPlaylist(a), d.wavesurfer.fireEvent("playlist-ready") }),

        c.on("error", function (a) { throw new Error("Error reading the playlist fileXHR error: " + a.target.statusText) })
      },

      getPlaylist:

        function ()

      { return this.playlistData },

      loadPlaylist: function (a) {
        var b = [];
        if ("m3u" != this.playlistType && "audio/mpegurl" != this.playlistType)

          throw new Error("No valid playlist file provided");

        // b = a.replace(/^.*#.*$|#EXTM3U|#EXTINF:/gm, "").split("\n");


        b = ["abc.mp3", "abc_2.mp3", "Song12.mp3"];

        for (var c = [], d = 0; d < b.length; d++)
        {
          c.push(b[d].toString());
        }

         // b[d] && (b[d].indexOf(".mp3") === -1 && b[d].indexOf(".wav") === -1 || 

        this.playlistData = c
      }
    }, a.util.extend(a.Playlist, a.Observer)
  });
}
