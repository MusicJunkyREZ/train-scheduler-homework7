// Initialize Firebase
var config = {
    apiKey: "AIzaSyBSXOoOPqVHDjZZaKHDKvyYqASw-pR9Fyg",
    authDomain: "homework7-3b339.firebaseapp.com",
    databaseURL: "https://homework7-3b339.firebaseio.com",
    projectId: "homework7-3b339",
    storageBucket: "homework7-3b339.appspot.com",
    messagingSenderId: "1052984540633"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    frequency: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  alert("All aboard!");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().frequency;


    // Train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainStart);
    console.log(trainFrequency);

    //Calculating minutes to next train
    var currentTime = moment();
    var firstDeparture = moment(firstDeparture, "HH:mm");

    if (currentTime < firstDeparture){
        var arrivalTime = moment(arrivalTime).format("HH:mm")
        var nextTrain = moment.duration(firstDeparture.diff(currentTime));
        var nextTrain = Math.round(nextTrain.asMinutes());
    } else{
        var nextTrain = moment.duration(currentTime.diff(firstDeparture));
        var nextTrain = Math.round(nextTrain.asMinutes());
        var nextTrain = trainFrequency - (nextTrain%trainFrequency);
        var nextTrain = trainFrequency - nextTrain;
        var arrivalTime = moment().add(nextTrain, "minutes").format("HH:mm");
    };

    // Formatting train start
    var trainStartTime = moment.unix(trainStart).format("HH:mm");

    // Calculate next arrival by subtracting 
    var trainNextArrival = Math.abs((moment().diff(moment(trainStart, "X"), "minutes"))); //Created an absolute value to make all results positive
    console.log(trainNextArrival);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(trainStartTime), //Has to be in HH mm
        $("<td>").text(trainNextArrival)
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case