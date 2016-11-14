'use strict';

console.log('scripts loaded');

//var serverUrl = 'ftp://ftp.collectivemediaserver.com/carl-test-area/auth.php';
var serverUrl = 'http://collectivemediaserver.com/carl-test-area/auth.php?callback=';

var outputDiv = document.getElementById('dataOutput');
var httpRequest;

function ajaxCall() {
  console.log('ajax call');
  httpRequest = new XMLHttpRequest();

  httpRequest.onreadystatechange = function () {
    console.log('state change');
    if (httpRequest.readyState == 4 && httpRequest.status === 200) {
      console.log('ready!');
      responseHandler(httpRequest.responseText);
    } else {
      console.log('error');
    }
  };
  httpRequest.open('GET', serverUrl, true);
  httpRequest.send();
}

function responseHandler(responseData) {
  var objectData = JSON.parse(responseData);

  var content = objectData["data"]["results"][0];
  console.log(content);
  outputDiv.innerHTML = "<ul>";
  for (var key in content) {
    switch (key) {
      case "name":
        outputDiv.innerHTML += "<li>" + "<strong>" + key.charAt(0).toUpperCase() + key.slice(1) + ": " + "</strong>" + "<h3>" + content[key] + "</h3>" + "</li>";
        break;
      case "description":
        outputDiv.innerHTML += "<li>" + "<strong>" + key.charAt(0).toUpperCase() + key.slice(1) + ": " + "</strong>" + "<p>" + content[key] + "</p>" + "</li>";
        break;
      case "thumbnail":
        var extension = content[key]["extension"];
        var path = content[key]["path"];

        outputDiv.innerHTML += "<li>" + "<img class='characterThumbnail' src='" + path + "." + extension + "'/>" + "</li>";
        break;

    }
  }
  outputDiv.innerHTML += "</ul>";
}

ajaxCall();