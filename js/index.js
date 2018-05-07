
var regionArr = new Array();
var regionIDArr = new Array();
var countreg = 1;

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

   // regionArr.length = 0;
    regionIDArr.length = 0;
    countreg = 1;
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

    //var i = wavesurfer.region.length;




    for (var i = 0; i < regionArr.length; i++) {
        //clipEndtime = regionArr[i];
        wavesurfer.addRegion({
            id: 'Sample' + countreg,
            start: regionArr[i], // time in seconds
            end: regionArr[i] + newadd, // time in seconds
            color: 'red'
        });
       // this.wavesurfer.fireEvent('region-update-end', this);
        regionIDArr.push('Sample' + countreg);
        countreg = countreg + 1;
    }


}


wavesurfer.on('onmousedown', function () {
    wavesurfer.play();
});


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
var countreg = 1;


$('body').on('click', '.MarkMP', function () {

    now = wavesurfer.getCurrentTime();

    if (slider != 0)
        newadd = 0.05 - (0.05 * slider / 200)    //200 is the Double percentage value
    else
        newadd = 0.0925;

    if (slider == 10) {
        newadd = 0.0925;
    }

    wavesurfer.addRegion({
        id: 'Sample' + countreg,
        start: now, // time in seconds
        end: now + newadd, // time in seconds
        color: 'Red',
        resize: true
    });

    regionIDArr.push('Sample' + countreg);
    countreg = countreg + 1;


    //this.wavesurfer.fireEvent('region-update-end', this);
    //document.getElementById('SelectionTime').text = now;
    regionArr.push(now);
   
    var regiontext = "";
    for (var i = 0; i < regionArr.length; i++) {
        regiontext = regiontext + regionArr[i] + " ";
    }

    $("#SelectionTime").text(regiontext);
    //console.log(now);
});


$('body').on('click', '.DeleteMarkMP', function () {
    now = "";
    regionArr.length = 0;
    wavesurfer.clearRegions();
    //document.getElementById('SelectionTime').text = now;
    $("#SelectionTime").text(" ");

});


wavesurfer.on('region-update-end', function (region, event) {
    console.log("entered method: region-update-end");

    if (!region.hasDeleteButton) {
        var regionEl = region.element;

        var deleteButton = regionEl.appendChild(document.createElement('deleteButton'));
        deleteButton.className = 'fa fa-trash';

        deleteButton.addEventListener('click', function (e) {
            var Xstarttime = region.start;
            removeArrayElement(Xstarttime);
            region.remove();
        });

        deleteButton.title = "Delete Mark";

        var css = {
            display: 'block',
            float: 'right',
            padding: '3px',
            position: 'relative',
            zIndex: 10,
            cursor: 'pointer',
            cursor: 'hand',
            color: '#FFFFFF'
        };

        region.style(deleteButton, css);
        region.hasDeleteButton = true;
    }
});

function removeArrayElement(RStartTime) {
    var i = regionArr.indexOf(RStartTime);
    if (i != -1) {
        regionArr.splice(i, 1);
    }

    var regiontext = "";
    for (var i = 0; i < regionArr.length; i++) {
        regiontext = regiontext + regionArr[i] + " ";
    }

    $("#SelectionTime").text(regiontext);

}


wavesurfer.on('region-mouseenter', function (region, event) {
    var start_time = region.start;
    var RegID = region.id;
    // $("#SelectionTime").text(start_time);

    var indexR = regionIDArr.indexOf(RegID);
    var start_time = region.start;

    regionArr[indexR] = start_time;

    var regiontext = "";
    for (var i = 0; i < regionArr.length; i++) {
        regiontext = regiontext + regionArr[i] + " ";
    }

    $("#SelectionTime").text(regiontext);
});


wavesurfer.on('region-mouseleave', function (region, event) {
   
    //var RegID = region.id;
    //var RIndex = regionIDArr.indexOf[RegID];

    //regionArr[RIndex] = region.start;

    //var regiontext = "";
    //for (var i = 0; i < regionArr.length; i++) {
    //    regiontext = regiontext + regionArr[i] + " ";
    //}

    //$("#SelectionTime").text(regiontext);

});






