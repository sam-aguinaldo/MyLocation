/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    //Variables
    latitude: "",
    longitude: "",
    // Application Constructor
    initialize: function () {
        console.log('initialize called');

        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function () {
        console.log('events bound');

        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function () {
        document.getElementById("welcomeMsg").innerHTML += "Cordova is ready! version=" + window.device.cordova;
        console.log("onDeviceReady. You should see this message in Visual Studio's output window.");
        document.getElementById("welcomeMsg").innerHTML += "<br/>My first cordova (PhoneGap) Application";
        document.getElementById("showOnMap").setAttribute('style', 'display:none;');
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    //call the API to get current position
    // more details at http://docs.phonegap.com/en/2.4.0/cordova_geolocation_geolocation.md.html#geolocation.getCurrentPosition
    showGeoLocation: function () {
        navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
    },
    onSuccess: function (position) {
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
                'Longitude: ' + position.coords.longitude + '<br />' +
                'Altitude: ' + position.coords.altitude + '<br />' +
                'Accuracy: ' + position.coords.accuracy + '<br />' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
                'Heading: ' + position.coords.heading + '<br />' +
                'Speed: ' + position.coords.speed + '<br />' +
                'Timestamp: ' + position.timestamp + '<br />';
        app.latitude = position.coords.latitude;
        app.longitude = position.coords.longitude;
        document.getElementById("showOnMap").setAttribute('style', 'display:block;');
    },

    // onError Callback receives a PositionError object
    //
    onError: function (error) {
        console.log('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');

        alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
    },
    
    // use google maps API to create a map
    showPositionOnMap: function () {

        var latLng = new google.maps.LatLng(app.latitude, app.longitude);
        var mapOptions = app.getMap(latLng);
        //display the map
        var map = new google.maps.Map(document.getElementById("map_canvas"),
                mapOptions);

        app.setMarker(latLng, map);
    },

    //return the map object to be displayed in the markup
    getMap: function (latLng) {
        var mapOptions = {
            center: latLng,
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        return mapOptions;
    },

    // set a marker on the map at a specific location
    setMarker: function (latLng, map) {
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: "You are here!"
        });

    }
};
