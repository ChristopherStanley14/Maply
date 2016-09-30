function lookupLatLong(city, state, postalCode) {

    var address = "";
    if (postalCode.length != 0) {
        address = postalCode.trim();
    }
    else if (city.length != 0 && state != 0) {
        address = city.trim() + ", " + state;
    }
    else {
        return;
    }


    var googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyCwyTdHnIN_Sw0vKGhH_dhb4VjI4QR2G1A";

    var request = {
        url: googleUrl,
        success: lookupLatLong_Complete
    };

    $.ajax(request);


}



function lookupZip() {
    var postalCode = $("#postalCode").val();
    lookupLatLong("", "", postalCode);
}



var longName1 = "";
var longName2 = "";

function lookupLatLong_Complete(result) {
    var result = result.results["0"];
    var latitude = result.geometry.location.lat;
    var longitude = result.geometry.location.lng;
    console.log("The lat and long is " + latitude + "," + longitude);

    longName1 = result.address_components[1].long_name;
    shortName1 = result.address_components[3].short_name;
    $("#div").fadeIn("fast", "linear");
    $("#div").append(initMap);



    return initMap(latitude, longitude);
}


$(function () {
    $("#div").hide();
    $("#buttonLookUpZip").on("click", lookupZip);
    
    



});


function initMap(latitude, longitude) {

    var myLatLng = { lat: latitude, lng: longitude };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,

    });

    
   

}






