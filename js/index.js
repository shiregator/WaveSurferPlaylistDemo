
var regionArr = new Array();
var regionIDArr = new Array();
var countreg = 1;
var now = 0.00;

var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#D2EDD4',
    progressColor: 'Yellow',
    cursorColor: '#fff',
    markerWidth: 2
});

// load default track

$(document).ready(function () {
    wavesurfer.load('abc.mp3');
    setTimeout(function () {
        wavesurfer.clearRegions();
        DrawRegionAfterLoad();
    }, 3000);
});
// load M3U playlist
var myPlaylist = wavesurfer.Playlist;
$('body').on('click', '.loadM3U', function () {
    myPlaylist.init({
        wavesurfer: wavesurfer,
        playlistFile: 'abc.mp3',
        playlistType: 'm3u'
    });
    //wavesurfer.enableDragSelection({});
    setTimeout(function () {
       
        DrawRegionAfterLoad();
       
    }, 5000);
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
    //wavesurfer.enableDragSelection({});
    regionIDArr.length = 0;

    setTimeout(function () { 
        DrawRegionAfterLoad();    
    }, 3000);

});

function DrawRegionAfterLoad()
{
    regionArr.length = 0;
    regionIDArr.length = 0;
    //wavesurfer.enableDragSelection({});
    var duration = wavesurfer.getDuration();
    var timeframe = duration / 200;
    var clipStarttime = timeframe;
    var clipEndtime = 0;
    var demotext = "";
    for (var i = 1; i <= 200; i++) {
        clipEndtime = clipStarttime + timeframe;
        wavesurfer.addRegion({
            id: 'Sample' + countreg,
            start: clipStarttime, // time in seconds
            end: clipStarttime + 0.0925, // time in seconds
            color: 'Yellow',
            resize:false
        });
        regionArr.push(clipStarttime);
        clipStarttime = clipEndtime;
        regionIDArr.push('Sample' + countreg);
        countreg = countreg + 1;
        // demotext = demotext + "</br>" + "StartTime = " + clipStarttime + "  Endtime = " + clipStarttime + 0.08;
    }
    SortTheArray(regionArr, regionIDArr);
}


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
   // wavesurfer.enableDragSelection({});

    newadd = GetNewAddvalue();
    for (var i = 0; i < regionArr.length; i++) {
        //clipEndtime = regionArr[i];
        wavesurfer.addRegion({
            id: 'Sample' + countreg,
            start: regionArr[i], // time in seconds
            end: regionArr[i] + newadd, // time in seconds
            color: 'red',
            resize:false
        });
       // this.wavesurfer.fireEvent('region-update-end', this);
        regionIDArr.push('Sample' + countreg);
        countreg = countreg + 1;
    }

    SortTheArray(regionArr, regionIDArr);

}


wavesurfer.on('onmousedown', function () {
    wavesurfer.play();
});

wavesurfer.on('ready', function () {
    var timeline = Object.create(WaveSurfer.Timeline);

    timeline.init({
        wavesurfer: wavesurfer,
        container: '#waveform-timeline'

    });
});

$('body').on('click', '.MarkMP', function () {

    now = wavesurfer.getCurrentTime();

    newadd = GetNewAddvalue();

    wavesurfer.addRegion({
        id: 'Sample' + countreg,
        start: now, // time in seconds
        end: now + newadd, // time in seconds
        color: 'Red',
        resize: false
    });

    regionIDArr.push('Sample' + countreg);
    countreg = countreg + 1;

    regionArr.push(now);

    SortTheArray(regionArr, regionIDArr);
   
  
    //console.log(now);
});


$('body').on('click', '.DeleteMarkMP', function () {
    now = "";
    regionArr.length = 0;
    regionIDArr.length = 0;
    wavesurfer.clearRegions();
    //document.getElementById('SelectionTime').text = now;
    $("#SelectionTime").text(" ");

});

$('body').on('click', '.DeleteOddRegions', function () {
   
    
    for (var i = 0; i < regionArr.length; i++) {
        regionArr.splice(i + 1, 1);
    }
    regionIDArr.length = 0;
    countreg = 1;
    var newadd = 0;
    wavesurfer.clearRegions();
   // wavesurfer.enableDragSelection({});

    newadd = GetNewAddvalue();

    //var i = wavesurfer.region.length;




    for (var i = 0; i < regionArr.length; i++) {
        //clipEndtime = regionArr[i];
        wavesurfer.addRegion({
            id: 'Sample' + countreg,
            start: regionArr[i], // time in seconds
            end: regionArr[i] + newadd, // time in seconds
            color: 'red',
            resize:false
        });
        // this.wavesurfer.fireEvent('region-update-end', this);
        regionIDArr.push('Sample' + countreg);
        countreg = countreg + 1;
    }

    SortTheArray(regionArr, regionIDArr);

});


function GetNewAddvalue()
{
    if (slider != 0)
        newadd = 0.05 - (0.05 * slider / 200)    //200 is the Double percentage value
    else
        newadd = 0.0925;

    if (slider == 10) {
        newadd = 0.0925;
    }

    return newadd;
}


wavesurfer.on('region-update-end', function (region, event) {
    console.log("entered method: region-update-end");

    var start_time = region.start;
    var RegID = region.id;
    // $("#SelectionTime").text(start_time);

    var indexR = regionIDArr.indexOf(RegID);
    var start_time = region.start;


    regionArr[indexR] = start_time;
    SortTheArray(regionArr, regionIDArr);

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
        regiontext = regiontext + regionArr[i].toFixed(2) + " ";
    }

    $("#SelectionTime").text(regiontext);

}


wavesurfer.on('region-click', function (region, event) {
    

    //var regiontext = "";
    //for (var i = 0; i < regionArr.length; i++) {
    //    regiontext = regiontext + regionArr[i].toFixed(2) + " ";
    //}

    //$("#SelectionTime").text(regiontext);
});


//wavesurfer.on('region-mouseleave', function (region, event) {

//    SortTheArray(regionArr, regionIDArr);
//});


wavesurfer.on('region-mouseup', function (region, event) {

    SortTheArray(regionArr, regionIDArr);
});


function SortTheArray(RegionTime,RegionID) {
    var length = RegionTime.length;
    for (var i = 0; i < length - 1; i++) {
        //Number of passes
        var min = i; //min holds the current minimum number position for each pass; i holds the Initial min number
        for (var j = i + 1; j < length; j++) { //Note that j = i + 1 as we only need to go through unsorted array
            if (RegionTime[j] < RegionTime[min]) { //Compare the numbers
                min = j; //Change the current min number position if a smaller num is found
            }
        }
        if (min != i) {
            //After each pass, if the current min num != initial min num, exchange the position.
            //Swap the numbers 
            var tmp = RegionTime[i];
            RegionTime[i] = RegionTime[min];
            RegionID[i] = RegionID[min];
            RegionTime[min] = tmp;
        }
    }

    var regiontext = "";
    for (var i = 0; i < regionArr.length; i++) {
        regiontext = regiontext + regionArr[i].toFixed(2) + " ";
    }

    $("#SelectionTime").text(regiontext);
}







