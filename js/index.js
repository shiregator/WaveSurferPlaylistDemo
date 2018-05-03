var regionArr = new Array();

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

    wavesurfer.enableDragSelection({});
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
    regionArr.length = 0;
    wavesurfer.clearRegions();   
    $("#SelectionTime").text(" ");
    wavesurfer.load(myList[$(this).data('id')]);
    wavesurfer.enableDragSelection({});
    //setTimeout(function () { 
    //    // Add a couple of pre-defined regions
    //    wavesurfer.enableDragSelection({});
    //    var duration = wavesurfer.getDuration();
    //    var timeframe = duration / 200;
    //    var clipStarttime = timeframe;
    //    var clipEndtime = 0;
    //    var demotext = "";
    //    for (var i = 1; i <=200; i++)
    //    {
    //        clipEndtime = clipStarttime + timeframe;
    //        wavesurfer.addRegion({
    //            start: clipStarttime, // time in seconds
    //            end: clipStarttime+0.0925, // time in seconds
    //            color: 'Yellow'
    //        });
    //        clipStarttime = clipEndtime;

    //       // demotext = demotext + "</br>" + "StartTime = " + clipStarttime + "  Endtime = " + clipStarttime + 0.08;
    //    }

    //    //document.getElementById('Demotext').innerHTML = demotext.toString();


    ////wavesurfer.addRegion({
    ////    start: 2, // time in seconds
    ////    end: 2.10, // time in seconds
    ////    color: 'Yellow'
    ////});

    ////wavesurfer.addRegion({
    ////    start: 8,
    ////    end: 8.10,
    ////    color: 'Red'
    ////});

    ////wavesurfer.addRegion({
    ////    start: 15,
    ////    end: 15.10,
    ////    color: 'Green'
    ////});
    //}, 3000);

});




var slider = 0;
var sliderMax = 300;

$('#waveform').on('mousewheel', function (e) {
    if (e.originalEvent.wheelDelta > 0) {
        slider = slider + 10;
        if (slider > sliderMax) {
            slider = sliderMax;
        }
        var zoomLevel = Number(slider);
        wavesurfer.zoom(zoomLevel);

        ResizeRegionOnZooming(slider);
    }
    else {
        slider = slider - 10;
        if (slider < 0) {
            slider = 0;
        }
        var zoomLevel = Number(slider);
        wavesurfer.zoom(zoomLevel);
        // ResizedecreaseNewResion(slider);
        ResizeRegionOnZooming(slider);
    }
});

function ResizeRegionOnZooming(Slidervalue) {

    var newadd = 0;
    wavesurfer.clearRegions();
    wavesurfer.enableDragSelection({});

    if (Slidervalue != 0)
        newadd = 0.05 - (0.05 * Slidervalue / 200)    //200 is the Double percentage value
    else
        newadd = 0.0925;

    if (Slidervalue == 10) {
        newadd = 0.0925;
    }



    for (var i = 0; i < regionArr.length; i++) {
        //clipEndtime = regionArr[i];
        wavesurfer.addRegion({
            start: regionArr[i], // time in seconds
            end: regionArr[i] + newadd, // time in seconds
            color: 'red'
        });
        this.wavesurfer.fireEvent('region-update-end', this);

    }


}


//function ResizedecreaseNewResion(Slidervalue) {

//    var newadd = 0;
//    wavesurfer.clearRegions();
//    wavesurfer.enableDragSelection({});

//    if (Slidervalue != 0)
//        newadd = 0.05 - (0.05 * Slidervalue / 200)
//    else
//        newadd = 0.0925;

//    if (Slidervalue == 10) {
//        newadd = 0.0925;
//    }


//    var duration = wavesurfer.getDuration();
//    var timeframe = duration / 200;
//    var clipStarttime = timeframe;
//    var clipEndtime = 0;
//    for (var i = 1; i <= 200; i++) {
//        clipEndtime = clipStarttime + timeframe;
//        wavesurfer.addRegion({
//            start: clipStarttime, // time in seconds
//            end: clipStarttime + newadd, // time in seconds
//            color: 'Yellow'
//        });
//        clipStarttime = clipEndtime;

//    }


//}


function resizeresign(Slider) {
    if (Slider > 0 && Slider < 50) {
        wavesurfer.clearRegions();
        wavesurfer.enableDragSelection({});
        wavesurfer.addRegion({
            start: 2, // time in seconds
            end: 2.07, // time in seconds
            color: 'Yellow'
        });

        wavesurfer.addRegion({
            start: 8,
            end: 8.07,
            color: 'Red'
        });

        wavesurfer.addRegion({
            start: 15,
            end: 15.07,
            color: 'Green'
        });
    }

    else if (Slider >= 50 && Slider <= 100) {
        wavesurfer.clearRegions();
        wavesurfer.enableDragSelection({});
        wavesurfer.addRegion({
            start: 2, // time in seconds
            end: 2.03, // time in seconds
            color: 'Yellow'
        });

        wavesurfer.addRegion({
            start: 8,
            end: 8.03,
            color: 'Red'
        });

        wavesurfer.addRegion({
            start: 15,
            end: 15.03,
            color: 'Green'
        });
    }
    else if (Slider > 100 && Slider < 150) {

        wavesurfer.clearRegions();
        wavesurfer.enableDragSelection({});
        wavesurfer.addRegion({
            start: 2, // time in seconds
            end: 2.02, // time in seconds
            color: 'Yellow'
        });

        wavesurfer.addRegion({
            start: 8,
            end: 8.02,
            color: 'Red'
        });

        wavesurfer.addRegion({
            start: 15,
            end: 15.02,
            color: 'Green'
        });

    }
    else if (Slider >= 150 && Slider <= 200) {
        wavesurfer.clearRegions();
        wavesurfer.enableDragSelection({});
        wavesurfer.addRegion({
            start: 2, // time in seconds
            end: 2.01, // time in seconds
            color: 'Yellow'
        });

        wavesurfer.addRegion({
            start: 8,
            end: 8.01,
            color: 'Red'
        });

        wavesurfer.addRegion({
            start: 15,
            end: 15.01,
            color: 'Green'
        });
    }
}

wavesurfer.on('ready', function () {
    var timeline = Object.create(WaveSurfer.Timeline);

    timeline.init({
        wavesurfer: wavesurfer,
        container: '#waveform-timeline'

    });
});




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


var now = 0.00;

$('body').on('click', '.MarkMP', function () {

    now = wavesurfer.getCurrentTime();

    wavesurfer.addRegion({
        start: now, // time in seconds
        end: now + 0.0925, // time in seconds
        color: 'Red'
    });
    //document.getElementById('SelectionTime').text = now;
    regionArr.push(now);
    var regiontext = "";
    for (var i = 0; i < regionArr.length; i++) {
        regiontext = regiontext + regionArr[i] + " ";
    }

    $("#SelectionTime").text(regiontext);
    console.log(now);
});


$('body').on('click', '.DeleteMarkMP', function () {
    now = "";
    regionArr.length = 0;
    wavesurfer.clearRegions();
    //document.getElementById('SelectionTime').text = now;
    $("#SelectionTime").text(" ");

});






