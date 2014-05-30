//load google map script
function loadAPI(){
	 	if (typeof google === 'object' && typeof google.maps === 'object') {
	 		initialize();
	    }else{ 
		var script = document.createElement("script");
			script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=drawing&callback=initialize";
			script.type = "text/javascript";
			document.getElementsByTagName("head")[0].appendChild(script);
	    }
}

//call on load
loadAPI();	

//===================================== Edit , Delete Record ======================================
	function setGeofenceRecordOperation(geofenceid, operation, trRowID, trackeduserid)	{
		//refresh/clear map
		deleteSelectedShape();
		//set PK locationid
		document.geofenceform.geofenceid.value=geofenceid;
		
		//fill record
		var x = document.getElementById(trRowID).cells;
		document.getElementById("geofence").value = x["geofence"].innerHTML;
		//var geofence =  x["geofence"].innerHTML;
		var diveName = trRowID+'geofence_div';
		var geofence = document.getElementById(diveName).innerHTML;
		drawPlygonFromDB(geofence);
		$(document).ready(function() {
		    $("#trackeduserid").val(trackeduserid);
		});
		
		//set Operation
		if(operation == 'edit'){
			document.geofenceform.operationType.value = "update";
			//document.geofenceform.btnSubmit.value = "Update";
			document.geofenceform.btnSubmit.innerHTML = "Update";
		}else if(operation == 'delete'){
			document.geofenceform.operationType.value = "delete";
			//document.geofenceform.btnSubmit.value = "Delete";
			document.geofenceform.btnSubmit.innerHTML = "Delete";
		}else{} 
	}
	
	function refresh(){
		//document.geofenceform.btnSubmit.value = "Add";
		document.geofenceform.btnSubmit.innerHTML = "Add";
		document.geofenceform.operationType.value = "add";
		deleteSelectedShape();
	} 

//=================================== End Edit , Delete Record ====================================

//======================== Control Enable / Disable , Select ======================================
//========================End Control Enable / Disable , Select ===================================

//======================== Google MAP Script =======connection===============================
	//global declaration
	var polygonShape;
	var map;
	 //clear selection		
	 function clearSelection() {
	   if (polygonShape) {
	     polygonShape.setEditable(false);
	     polygonShape = null;
	   }
	 }//end clearSelection
	
	 //set selection
	 function setSelection(shape) {
	   clearSelection();
	   polygonShape = shape;
	   shape.setEditable(true);
	 }//end setSelection
	
	 //delete SelectedShape
	 function deleteSelectedShape() {
	   if (polygonShape != null) {
	     polygonShape.setMap(null);
	 	 polygonShape = null;
	     //createDrawingManager();
	   }
	 }//deleteSelectedShape
	
	 //create drawing manager
	 function createDrawingManager(){
			var drawingManager = new google.maps.drawing.DrawingManager({
			   		drawingMode: google.maps.drawing.OverlayType.POLYGON,
			   		drawingControl: false,
			 		polygonOptions: {
					    clickable:false,
					    editable: true,
					    draggable:false,
					    strokeColor: "#FF0000",
					    strokeOpacity: 0.8,
					    strokeWeight: 3,
					    fillColor: "#FF0000",
					    fillOpacity: 0.1,
					    zIndex: 1
			   		},
		   			map: map	
			});
	
			//add overlay complete listener(fire on polygon completion)
			google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
			       if (event.type == google.maps.drawing.OverlayType.POLYGON) {
			   	    	// Switch back to non-drawing mode after drawing a shape.
			           	drawingManager.setDrawingMode(null);
			
					    // Add an event listener that selects the newly-drawn shape when the user
					    // mouses down on it.
					    var newShape = event.overlay;
					    newShape.type = event.type;
					    setSelection(newShape);
			     	}
			});
 	}//end createDrawingManager	
		
 	//get cordinates of Polygon
	function getCordinates(){
		if(polygonShape != null){	
		   var vertices = polygonShape.getPath()
		   var contentString="";
		   // Iterate over the vertices.
		   for (var i =0; i < vertices.getLength(); i++) {
		   var xy = vertices.getAt(i);
			    contentString += xy.lat() + ',' +xy.lng()+"|";
		   }
		   contentString = contentString.substring(0, contentString.length-1);
		   document.geofenceform.geofence.value = contentString; 

		   if(contentString.length > 0)
			   return true;
		   else
			   return false;
		}
	}
 	
	//draw polygon from db
	function drawPlygonFromDB(geofence){
		//remove instance of polygonShape from map
	 	
		var boundarydata = new Array();
		//var boundary = document.geofenceform.geofence.value;//geofence;	// like 18.4545454,78.4545454|18.4545454,78.4545454|18.4545454,78.4545454
		var boundary = geofence;
        var latlongs = boundary.split("|");
        var bounds = new google.maps.LatLngBounds();
        
        for (var i = 0; i < latlongs.length; i++) {
            latlong = latlongs[i].trim().split(",");
            boundarydata[i] = new google.maps.LatLng(latlong[0], latlong[1]);
            bounds.extend(boundarydata[i]);
        }

        polygonShape = new google.maps.Polygon({
	       path: boundarydata,		
           clickable:false,
	       editable: true,
	       draggable:false,
	       strokeColor: "#FF0000",
	       strokeOpacity: 0.8,
	       strokeWeight: 3,
	       fillColor: "#FF0000",
	       fillOpacity: 0.1,
	       zIndex: 1
        });

		polygonShape.setMap(map);
		
        //The Center of the Polygon
        map.setCenter(bounds.getCenter());
        
		map.fitBounds(bounds);
	}//end drawPlygonFromDB
	//end draw polygon from db	
	
	
 	//initialize map
	function initialize() {
		var mapOptions = {
			center: new google.maps.LatLng(21.454554, 78.86570),
			zoom: 6
		};
		
		//create map with option	
		map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);
		
		if(navigator.geolocation) {
  		   navigator.geolocation.getCurrentPosition(function(position) {
		          initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
		          map.setCenter(initialLocation);
		          map.setZoom(8);
  		   });
	    }
		//create DrawingManager	
		//createDrawingManager();
	}
	//call on window load	
	//google.maps.event.addDomListener(window, 'load', initialize);
		
//======================== End Google MAP Script ======================================