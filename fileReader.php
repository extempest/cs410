<!DOCTYPE html>
<html>
<head>
<title>Jakarta Utara - Google Fusion Tables</title>
<style type="text/css">
html, body {
margin: 0;
padding: 0;
width: 100%;
height:100%
}

.mid {
height: 100%;
margin: 0;
padding: 0;
width: 50%;
float:left;
}
</style>

<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false&language=id"></script>
<script type="text/javascript" src="maplabel.js"></script>

<script type="text/javascript">
var map;
var areas=[];
var childs=[];
var childList=[];
var defZoom = 11;
var hide = [];
var parentName = "";
var jakarta = new google.maps.LatLng(-6.246835366529097, 106.84077735229488);

function initialize() {
	map = new google.maps.Map(document.getElementById('googft-mapCanvas'), {
		center: jakarta,
		zoom: defZoom,
		scrollwheel: false,
		panControl: false,
		zoomControl: false,
		disableDoubleClickZoom: true,
		draggable: false,	
		streetViewControl: false,
		mapTypeControl: false,	
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	
    var test = <?php
    $file = file_get_contents('fruits.txt', FILE_USE_INCLUDE_PATH);
    echo $file
    ?>
    
    console.log(test)
    console.log(test[2])
    
    var test2 = ["apple","orange","grapes"]
    console.log(test2)
    console.log(test2[2])

	var homeControlDiv = document.createElement('div');
	var back = new backButton(homeControlDiv, map);

	homeControlDiv.index = 1;
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(homeControlDiv);
	
	
	var script = document.createElement('script');
    var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
    url.push('sql=');
	var query = 'SELECT name, geometry, color, level, Latitude, Longitude, Parent FROM ' +
    '1CZBgO9YkysEkj_z7_f89qa1ctCBOJLx1fYu-z_E ';
	var encodedQuery = encodeURIComponent(query);
    url.push(encodedQuery);
    url.push('&callback=drawMap');
	url.push('&key=AIzaSyBmONgI5YExsA7vqdLAVgA8g2ZYn2dGUs4');
	script.src = url.join('');
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(script);
}
//"-6.166615934162247" 
function drawMap(data) {
	var rows = data['rows'];
	//console.log(JSON.stringify(rows))

    for (var i in rows) {
		var newCoordinates = [];
        var geometries = rows[i][1]['geometries'];
        if (geometries) {
			for (var j in geometries) {
				newCoordinates.push(constructNewCoordinates(geometries[j]));
			}
        }else{
			newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
        }
	    createPoly(newCoordinates,i,rows);			
	}
	showPolygons(areas);
}
	
function getBoundingBox(poly){
	var bounds = new google.maps.LatLngBounds();
	for(var j = 0; j < poly.length;j++){
			bounds.extend(poly[j]);
	}
	return bounds;
}

function createPoly(poly, id, data){
	var bounds = getBoundingBox(poly);
	//console.log(parseFloat(data[id][4])+bounds.getCenter().lat());

	var level = parseInt(data[id][3]);
	var area = new google.maps.Polygon({
			  id: id,
			  name: data[id][0],
			  paths: poly,
			  strokeColor: '#000000',
			  strokeOpacity: 0,
			  strokeWeight: 1,
			  fillColor: data[id][2],
			  fillOpacity: 0,
			  zindex: level,
			  visible:false,
			  map:map
	});
	
	//area.setMap(map);

	var mapLabel = new MapLabel({
		text:data[id][0],
		position: new google.maps.LatLng(
			bounds.getCenter().lat() + parseFloat(data[id][4]) , 
			bounds.getCenter().lng() + parseFloat(data[id][5])
			),
		fontColor: '#000000',
		strokeColor: '#ffffff',
		strokeWeight: 3,
		fontSize:15,
		align:'center',
		//opacity:0,
		fillOpacity: 0,
		minZoom:defZoom+level-1,
	//	minZoom:defZoom+level-2,
		zIndex:5000,
		visible:false,
		map:map
	});
	mapLabel.set('position', mapLabel.position);

	//console.log(data);
	if(level == 1){
		areas.push([area, mapLabel]);
	}else{
		childList.push([area, mapLabel,data[id][6]]);
		//console.log("asdfdasfsaf");
	}


	
	onclick(area, mapLabel, bounds, level)
	mouseover(area,mapLabel);
	mouseout(area,mapLabel);
   

}
	
function showPolygons(array){
	for(var i = 0; i<array.length;i++){
		polygon_fadein(array[i][0], 0.5,0.5,1.0);
		polygon_fadein(array[i][1], 0.5,1.0,0.0);			
		//array[i][1].fillOpacity=0;
		//console.log(array[i][1].opacity);
	}
}

function onclick(area, mapLabel, bounds,level){
	google.maps.event.addListener(area, 'click', function(e) {
		//console.log(defZoom+parseInt(data[id][3]));
		var search = document.getElementById("searchbar");
		map.setZoom(defZoom+level);
		map.panTo(bounds.getCenter());
		if(level == 1){
			google.maps.event.clearListeners(this,'mouseover');
			google.maps.event.clearListeners(this,'mouseout');
			for(var i = 0; i<childs.length;i++){
			
				polygon_fadeout(childs[i][0], 0.3);
				polygon_fadeout(childs[i][1], 0.3);
			//	childs[i][0].setVisible(false);
			//	childs[i][1].setVisible(false);
			}
			childs = [];
			//createChilds(area);
			//console.log(childList);
			for(var i = 0; i<childList.length;i++){
				if(area.name == childList[i][2]){
					childs.push([childList[i][0], childList[i][1]]);
				}
			}
			//console.log(childs);
			showPolygons(childs);
			search.value = area.name+", ";
			parentName = search.value;
			if(hide.length){
				//console.log(hide[0][0]);
				polygon_fadein(hide[0][0],0.5,0.5,1.0);
				polygon_fadein(hide[0][1],0.5,1,0);
				mouseover(hide[0][0],hide[0][1]);
				mouseout(hide[0][0],hide[0][1]);
				hide = [];
			}
			this.setOptions({
				strokeWeight: 1
			});
			hide.push([this, mapLabel]);
			polygon_fadeout(area, 0.3);
			polygon_fadeout(mapLabel, 0.3);
		}else{
			search.value = parentName+area.name;
		}
	});
}

	function mouseover(area, label){
		google.maps.event.addListener(area, 'mouseover', function() {
			this.setOptions({
				fillOpacity: 1.0,
				strokeWeight: 3
			});
			label.setOptions({
				strokeWeight: 5,
				opacity:1
			});
        });
	}
	
	function mouseout(area, label){
		google.maps.event.addListener(area, 'mouseout', function() {
            this.setOptions({
			  fillOpacity: 0.5,
			  strokeWeight: 1,
			});
			label.setOptions({
				strokeWeight: 3,
				opacity:0.8
			});
        });
	}
	
	
	
   function constructNewCoordinates(polygon) {
        var newCoordinates = [];
        var coordinates = polygon['coordinates'][0];
        for (var i in coordinates) {
          newCoordinates.push(
              new google.maps.LatLng(coordinates[i][1], coordinates[i][0]));
        }
        return newCoordinates;
    }

function polygon_fadeout(polygon, seconds){
    var fill = (polygon.fillOpacity*50)/(seconds*999);
    var stroke = (polygon.strokeOpacity*50)/(seconds*999);
	//console.log("fade out fill: "+fill);
    //console.log("fade out stroke: "+stroke);
	var fadeout = setInterval(function(){
        if(polygon.strokeOpacity + polygon.fillOpacity <= 0.0){
            clearInterval(fadeout);
            polygon.setVisible(false);        
        }
        polygon.setOptions({
            'fillOpacity': Math.max(0, polygon.fillOpacity-fill),
            'strokeOpacity': Math.max(0, polygon.strokeOpacity-stroke)
        });
    }, 50);
}

function polygon_fadein(polygon, seconds, fillOpacity, strokeOpacity){
	//console.log(polygon.fillOpacity);
	polygon.setVisible(true);
    var fill = (fillOpacity*50)/(seconds*999);
    var stroke = (strokeOpacity*50)/(seconds*999);
    var fadein = setInterval(function(){
        if(polygon.strokeOpacity >= strokeOpacity && polygon.fillOpacity >= fillOpacity){
            clearInterval(fadein);
        }
        polygon.setOptions({
            'fillOpacity': Math.min(fillOpacity, polygon.fillOpacity+fill),
            'strokeOpacity': Math.min(strokeOpacity, polygon.strokeOpacity+stroke)
        });
    }, 50);
}

function backButton(controlDiv, map){

	controlDiv.style.padding = '5px';
	// Set CSS for the control border
	var controlUI = document.createElement('div');
	controlUI.style.backgroundColor = 'white';
	controlUI.style.borderStyle = 'solid';
	controlUI.style.borderWidth = '2px';
	controlUI.style.cursor = 'pointer';
	controlUI.style.textAlign = 'center';
	controlUI.title = 'Zoom out';
	controlDiv.appendChild(controlUI);
	
	var controlText = document.createElement('div');
	controlText.style.fontFamily = 'Arial,sans-serif';
	controlText.style.fontSize = '12px';
	controlText.style.paddingLeft = '4px';
	controlText.style.paddingRight = '4px';
	controlText.innerHTML = '<b>Back</b>';
	controlUI.appendChild(controlText);
	google.maps.event.addDomListener(controlUI, 'click', function() {
		map.setCenter(jakarta);
		map.setZoom(defZoom);

	});
}
	
google.maps.event.addDomListener(window, 'load', initialize);
</script>
</head>

<body>

	<div class="mid" id="googft-mapCanvas"></div>
	<div class="mid">
	<form>
		Search:</br> <input type="text" name="location" id="searchbar" size="50"><br>
	</form>
	</div>
    <div class="mid">asdfasdf</div>
<div class="mid"> <?php
    echo "byung"
    ?>
</div>

<div> <?php
    $file = file_get_contents('fruits.txt', FILE_USE_INCLUDE_PATH);
    echo $file
    ?>
</div>
</body>
</html>
