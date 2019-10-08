// script.js
var test = "JS READY"
console.log("script.js " + test)
// 1.0 - Initialize FIREBASE
// 1.1 - Get from FIREBASE

// 2.0 - Import CSV




// 1.0 |---- Bringing in the FIREBASE -------------------------------------------------------------------------------------------------|

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

  $(document).ready(function() {
// 1.1 |---- Get Data from FIREBASE -------------------------------------------------------------------------------------------------|
    
    database.ref().on("value", function(snapshot) {
        var masterArray = snapshot.val().master;
        console.log(masterArray);
    
    })

// 2.0 |---- Import CSV --------------------------------------------------------------------------------------------------------------|

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
