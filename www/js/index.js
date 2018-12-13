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
var app_start = {
  // Variables  
  fcm_token: null,

  // Application Constructor
  initialize: function() {
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
      alert(device.cordova);
      FCMService.generateToken();
    }
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function() {
    this.receivedEvent("deviceready");
  },

  // Update DOM on a Received Event
  receivedEvent: function(id) {
    console.log("Received Event: " + id);
  }
};

var FCMService = {
  generateToken: function() {
    alert("fcm");
    if (!device.cordova) {
      return;
    }

    FCMPlugin.getToken(
      function(token) {
        alert(token);
        app_start.fcm_token = token;
      },
      function(err) {
        console.log("error retrieving token: " + err);
        alert("error retrieving token: " + err);
      }
    );
  }
};

app_start.initialize();
