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

//<!--===================================== Edit , Delete Record ======================================-->
//<script type="text/javascript">
	function setLocationRecordOperation(locationid, operation, trRowID, locationtypeid, accesslevelid)	{
		//set PK locationid
		document.locationform.locationid.value=locationid;
		
		//fill record
		var x = document.getElementById(trRowID).cells;
		document.getElementById("location_name").value = x["location_name"].innerHTML;
		document.getElementById("location_shortname").value = x["location_shortname"].innerHTML;
		//document.getElementById("location_type").value = x["location_type"].innerHTML;
		//document.getElementById("location_accesslevel").value = x["location_accesslevel"].innerHTML;
		document.getElementById("location_geocode").value = x["location_geocode"].innerHTML;
		document.getElementById("location_remarks").value = x["location_remarks"].innerHTML;
		//display marker position on map
		var geocode = x["location_geocode"].innerHTML;
		editMarkerPosition(geocode);
		$(document).ready(function() {
		    //$("#location_accesslevel").val(x["location_accesslevel"].innerHTML);
		    $("#location_accesslevel").val(accesslevelid);
		    $("#location_type").val(locationtypeid);
		});
		
		//set Operation
		if(operation == 'edit'){
			document.locationform.operationType.value = "update";
			//document.locationform.btnSubmit.value = "Update";
			document.locationform.btnSubmit.innerHTML = "Update";
		}else if(operation == 'delete'){
			document.locationform.operationType.value = "delete";
			//document.locationform.btnSubmit.value = "Delete";
			document.locationform.btnSubmit.innerHTML = "Delete";
		}else{}
	}
	
	function refresh(){
		//document.locationform.btnSubmit.value = "Add";
		document.locationform.btnSubmit.innerHTML = "Add";
		document.locationform.operationType.value = "add";
		deleteOverlays();
	} 
//</script>
//<!--=================================== End Edit , Delete Record ====================================-->

//<!--======================== Control Enable / Disable , Select ======================================-->
//<script type="text/javascript">
	function getLocationTypeId(value){
		if(value == -123)
			document.getElementById("location_location_text").type = "text";
		else{			
			document.getElementById("location_location_text").type = "hidden";
			document.getElementById("location_location_text").value = "";
		}
	}	
//</script>
//<!--========================End Control Enable / Disable , Select ======================================-->

//<!--======================== Google MAP Script =======connection===============================-->
//<script type="text/javascript">
  		var map;
    	var boundaryPolygon;
    	var markersArray = [];
        function initialize() {
        	
        	
	    	map = new google.maps.Map(document.getElementById('map_canvas_loc'), {
	        	  zoom: 5,
		          center: new google.maps.LatLng(21.454554, 78.86570),
			  	  mapTypeId: google.maps.MapTypeId.ROADMAP
	  	 	});
			
	    	
	    	if(navigator.geolocation) {
     		   navigator.geolocation.getCurrentPosition(function(position) {
 		          initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
 		          map.setCenter(initialLocation);
 		          map.setZoom(8);
     		   });
	    	}
	   		
	    	map.setTilt(45);
//======================== Add Marker to Map from DB ======================================
	
//========================end  Add Marker to Map from DB ======================================	   		
//======================== Add Marker on Click ======================================
		    //click on map(alert outside)
			google.maps.event.addListener(map, 'click', function (event) {
				//alert("event.latLng =:"+event.latLng.toString());
				// place a marker
                placeMarker(event.latLng);
				//document.locationform.getElementsById("location_geocode").value=event.latLng;
				var geocode = event.latLng.toString(); ;
				geocode = geocode.replace("(", "");
				geocode = geocode.replace(")", "");
				geocode = geocode.replace(" ", "");
				document.getElementById("location_geocode").value =  geocode;
	    	});
		  	
    	}//end initialize()	
//========================End Add Marker on Click ======================================
		var currentId = 0;
		var uniqueId = function() {
		    return ++currentId;
		};
			
		var markers = {};
		//Create Marker 
		function placeMarker(location) {
	            // first remove all markers if there are any
	            deleteOverlays();
	            var id = uniqueId(); // get new id
	            var marker = new google.maps.Marker({
	            	id: id,
	                position: location, 
	                map: map//,
	                //animation: google.maps.Animation.DROP
	            });
	            markers[id] = marker; 
	            // add marker in markers array
	            markersArray.push(marker);
	           /*  google.maps.event.addListener(marker, "rightclick", function (point) {
	            	 marker = markers[marker.id]; 
	            	 marker.setMap(null);
	            }); */
	            //map.setCenter(location);
	        }
		//delete Marker
		function deleteOverlays() {
            if (markersArray) {
                for (i in markersArray) {
                    markersArray[i].setMap(null);
                }
            markersArray.length = 0;
            }
      	}
      
        //edit Marker Position
      	function editMarkerPosition(geocode){
      		geocode = geocode.toString(); ;
      		var point = geocode.split(",");
      		var latLng = new google.maps.LatLng(point[0], point[1]);
      		placeMarker(latLng);
      		map.setCenter(latLng);
      		map.setZoom(8);
      	}
		
//</script>
//<!--======================== End Google MAP Script ======================================-->
  //call on window load	
  //google.maps.event.addDomListener(window, 'load', initialize);