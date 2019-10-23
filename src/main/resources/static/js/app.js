var app = (function () {

    var map;

    var getAirports = function (locationName) {
        var getPromise = $.get("/Airports/"+locationName);

        getPromise.then(
            function (data,status){
                markers = [];
                $("#listAirports tbody").empty();
                JSON.parse(data).map(function (value, index) {
                    var toAdd = '<tr><td>'+value.code+'</td><td>'+value.name+'</td><td>'+value.city+'</td><td>'+value.countryCode+'</td></tr>'
                    $("#listAirports tbody").append(toAdd);
                    markers.push(value.location);
                });

                plotMarkers(markers);
            },
            function () {
                console.log("Bad request");
            }
        );
        return getPromise;


    };

    var plotMarkers = function (m)
    {
        markers = [];
        bounds = new google.maps.LatLngBounds();

        m.forEach(function (marker) {
            var position = new google.maps.LatLng(marker.lat, marker.lng);

            markers.push(
                new google.maps.Marker({
                    position: position,
                    map: map,
                    animation: google.maps.Animation.DROP
                })
            );

            bounds.extend(position);
        });

        map.fitBounds(bounds);
    };


    return {

        searchAirports: function(){
            var locationName =  document.getElementById("locationInput").value;

            getAirports(locationName);

        },

        init : function(){
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: -34.397, lng: 150.644},
                zoom: 8
            });


        }


    };

})();