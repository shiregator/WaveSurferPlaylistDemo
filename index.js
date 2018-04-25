

var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#D2EDD4',
    progressColor: 'Yellow',
    cursorColor: '#fff',
    markerWidth: 2
});

// load default track
wavesurfer.load('https://ia800508.us.archive.org/15/items/LoveThemeFromTheGodfather/02LoveThemeFromTheGodfather.mp3');

// load M3U playlist
var myPlaylist = wavesurfer.Playlist;
$('body').on('click', '.loadM3U', function () {
    myPlaylist.init({
        wavesurfer: wavesurfer,
        playlistFile: 'abc.mp3',
        playlistType: 'm3u'
    });
});

// on playlist parsed with event playlist-ready
var myList;
wavesurfer.on('playlist-ready', function () {
    myList = myPlaylist.getPlaylist();
    for (var i = 0; i < myList.length; i++) {
        if (myList[i]) {
            $('#playlistbox').append('<li id="playTrack" class="col-md-4"  data-id="' + i + '">' + myList[i] + '</li>');
        }
    }
    console.log(myList);
});

// on waveform ready
wavesurfer.on('waveform-ready', function () {
    wavesurfer.play();
});

// on playlist track click
$('body').on('click', '#playTrack', function () {
    wavesurfer.clearRegions();
    wavesurfer.load(myList[$(this).data('id')]);

    setTimeout(function () { 
    // Add a couple of pre-defined regions
    wavesurfer.enableDragSelection({});
    wavesurfer.addRegion({
        start: 2, // time in seconds
        end: 2.10, // time in seconds
        color: 'Yellow'
    });

    wavesurfer.addRegion({
        start: 8,
        end: 8.10,
        color: 'Red'
    });

    wavesurfer.addRegion({
        start: 15,
        end: 15.10,
        color: 'Green'
    });
    }, 3000);

});




var slider = 0;


$('#waveform').on('mousewheel', function (e) {
    if (e.originalEvent.wheelDelta > 0) {
        slider = slider + 10;
        if (slider > 200) {
            slider = 200;
        }
        var zoomLevel = Number(slider);
        wavesurfer.zoom(zoomLevel);
    }
    else {
        slider = slider - 10;
        if (slider < 0) {
            slider = 0;
        }
        var zoomLevel = Number(slider);
        wavesurfer.zoom(zoomLevel);
    }
});


//wavesurfer.on('ready', function () {
//    var timeline = Object.create(WaveSurfer.Timeline);

//    timeline.init({
//        wavesurfer: wavesurfer,
//        container: '#waveform-timeline'
//    });
//});


wavesurfer.on('ready', function (e) {
    if (e == 100) {

        wavesurfer.enableDragSelection({});

        // Add a couple of pre-defined regions
        wavesurfer.addRegion({
            start: 2, // time in seconds
            end: 2.10, // time in seconds
            color: 'Yellow'
        });

        wavesurfer.addRegion({
            start: 8,
            end: 8.10,
            color: 'Red'
        });

        wavesurfer.addRegion({
            start: 15,
            end: 15.10,
            color: 'Green'
        });

    }
});




