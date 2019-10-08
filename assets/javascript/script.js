// script.js
var test = "JS READY"
console.log("script.js " + test)
// 2.1 - Initialize FIREBASE
// 2.1.1 - Initialize Google Charts
// 2.2 - Get from FIREBASE
// 2.3 - Import CSV

var masterArray = [];
var chart1 = [0,2,"Chart 1","div1"]


// 1.0 |---- Create Array Function ---------------------------------------------------------------------------------------------------|
// Loop through master array to get column # from each array within. Repeat for b.
function createArray( a , b ) {
    var newArray = [];
    for(i = 0; i < masterArray.length; i++){
        if (i === 0) {
            var x = [];
            x.push(masterArray[i][a]);
            x.push(masterArray[i][b]);
            console.log(x);
        }
        else {
        var x = [];
        if (a === 0) {
        x.push(Date(masterArray[i][a]));
        }
        else {
        x.push(parseInt(masterArray[i][a]));
        };
        x.push(parseInt(masterArray[i][b]));
        console.log(x);
        };
        newArray.push(x)   
    };
    console.log(masterArray.length)
    console.log(newArray)
    return(newArray);
};

// 1.1 |---- Create Chart Functions ---------------------------------------------------------------------------------------------------|
function LineChart(a) {
    var chartData = createArray( a[0] , a[1] )

    var data = new google.visualization.arrayToDataTable(chartData,false);
    var chartOptions = {
        title: a[2],
    }
    
    var chart = new google.visualization.LineChart(document.getElementById(a[3]));

    chart.draw(data, chartOptions);
}


// 2.0 |---- On Ready ---------------------------------------------------------------------------------------------------------------|

$(document).ready(function() {

    // 2.1 |---- Bringing in the FIREBASE ------------------------------------------------------------------------------------------|
    
      // Your web app's Firebase configuration
      const firebaseConfig = {
        apiKey: "AIzaSyByzGwJGJkA44iaOR9HBbNmTiNFo4trwd4",
        authDomain: "p1fbase.firebaseapp.com",
        databaseURL: "https://p1fbase.firebaseio.com",
        projectId: "p1fbase",
        storageBucket: "p1fbase.appspot.com",
        messagingSenderId: "645233672545",
        appId: "1:645233672545:web:d237ab2b51ffb7ac574520"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
    
      var database = firebase.database()

    // 2.1 |---- Bringing in the FIREBASE ------------------------------------------------------------------------------------------|
    google.charts.load('current', {'packages':['corechart']});
    
    // 2.2 |---- Get Data from FIREBASE -------------------------------------------------------------------------------------------------|
        
        database.ref().on("value", function(snapshot) {
            masterArray = snapshot.val().master;
            console.log(masterArray);
            // Create new Chart from Master array
            LineChart(chart1);    
        
        })
    
    // 2.3 |---- Import CSV --------------------------------------------------------------------------------------------------------------|
    
        // The event listener for the file upload
        document.getElementById('txtFileUpload').addEventListener('change', upload, false);
    
        // Method that checks that the browser supports the HTML5 File API
        function browserSupportFileUpload() {
            var isCompatible = false;
            if (window.File && window.FileReader && window.FileList && window.Blob) {
            isCompatible = true;
            }
            return isCompatible;
        }
    
        // Method that reads and processes the selected file
        function upload(evt) {
            if (!browserSupportFileUpload()) {
                alert('The File APIs are not fully supported in this browser!');
                } else {
                    var data = null;
                    var file = evt.target.files[0];
                    var reader = new FileReader();
                    reader.readAsText(file);
                    reader.onload = function(event) {
                        var csvData = event.target.result;
                        data = $.csv.toArrays(csvData);
                        if (data && data.length > 0) {
                        alert('Imported -' + data.length + '- rows successfully!');
                    // If upload successful, push data arrays to firebase
                            console.log(data)
                                database.ref().set({
                                    master: data
                                });
                        } else {
                            alert('No data to import!');
                        }
                    };
                    reader.onerror = function() {
                        alert('Unable to read ' + file.fileName);
                    };
                    console.log("FB " + database)
                }
            }


        });
    