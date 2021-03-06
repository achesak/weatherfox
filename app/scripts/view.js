/* This file defines the function for displaying all the data.
 * Depends: jQuery, jQuery Mobile, storage.js, options.js
 * Used on: main screen */

var viewData = function() {
    /* Displays the data. */
    
    // Create the storage object.
    var dataStorage = new Storage2(window.localStorage);
    
    // Get the current data as JSON, or create a new set of data if it doesn't already exist.
    if (!dataStorage.has("weatherData")) {
        var data = [];
    } else {
        var data = dataStorage.getJSON("weatherData");
    }
    
    // Get the options.
    var options = getOptions();
    
    // Set the units.
    if (options.units == "metric") {
        var units = {"temp": "°C",
                     "prec": "cm",
                     "wind": "kph",
                     "airp": "hPa"};
    } else {
        var units = {"temp": "°F",
                     "prec": "in",
                     "wind": "mph",
                     "airp": "mbar"};
    }
    
    // Make sure the no data message is shown by default (I hate this shit).
    $("#nodata").show(); 
    
    // Clear any existing data. (Is this step necessary?)
    $("#listview").empty();
        
    // Loop through all the data items and add them.
    for (var i = 0; i < data.length; i++ ) {
        
        // Hide the no data message.
        $("#nodata").hide();
        
        // Create the new item.
        var item = $("<li/>").append($("<h3/>", {text: data[i][0]}));
        var para = $("<p/>");
        
        // Create the data string.
        var dataStr = "Temperature: " + (Math.round(parseFloat(data[i][1]) * 100) / 100) + " " + units["temp"] + "<br />";
        if (data[i][2] == "None") {
            dataStr += "Precipitation: None<br />";
        } else {
            split2 = data[i][2].split(" ");
            dataStr += "Precipitation: " + (Math.round(parseFloat(split2[0]) * 100) / 100) + " " + units["prec"] + " of " + split2[1] + "<br />";
        }
        if (data[i][3] == "None") {
            dataStr += "Wind: None<br />";
        } else {
            split3 = data[i][3].split(" ");
            dataStr += "Wind: " + (Math.round(parseFloat(split3[0]) * 100) / 100) + " " + units["wind"] + " " + split3[1] + "<br />";
        }
        dataStr += "Humidity: " + data[i][4] + "%<br />";
        split5 = data[i][5].split(" ");
        dataStr += "Air pressure: " + (Math.round(parseFloat(split5[0]) * 100) / 100) + " " + units["airp"] + " " + split5[1] + "<br />";
        dataStr += "Cloud cover: " + data[i][6];
        
        // Add the data string.
        para.html(dataStr);
        // Append the data.
        item.append(para);
        // Insert the data.
        $("#listview").append(item);
        $("#listview").listview("refresh");
    }
        
};
