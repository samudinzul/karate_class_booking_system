// when index html is loaded
$(window).on("load", function (){ document.addEventListener("deviceready", onDeviceReady, false); });

//store student ID for edit and delete purpose
var studentInfo = {
    ID : null,
    result : null
}

//When device is ready load console log for notification plugin
function onDeviceReady(){
    console.log(navigator.notification);
    retrieveData();
}

//Store new record into MySQL Database by using PHP web service
function storeData() {
    var postData = $('#newrecord').serialize();
    postData = postData.replace(/\+/g, '%20');
    console.log(postData);
    $.get("https://mobileapp12.000webhostapp.com/new-student.php", postData, function(data) { 
        $(".result").html(data);
        //navigator.notification.alert ('Class Added! ', alertDismissed, 'Record', 'OK' );
        redirectToHome();
    });
}

//Retrive existing record from MySQL and display as a listview
function retrieveData(){
    $('#liststudent').empty();
    $.getJSON('https://mobileapp12.000webhostapp.com/list-student.php', function(data){
        $.each(data, function(index, data){
            $('#liststudent').append('<li><a href="#details" data-id="'+data.ID+'"><h4>'+data.Name+'</h4></li>');
        });
        $('#liststudent').listview('refresh');
    });
}

//Delete existing record from MySQL
function deleteData(){
    var postData = $('#deleterecord').serialize();
    console.log(postData);
    $.get("https://mobileapp12.000webhostapp.com/delete-student.php", postData, function(data) {
        $(".result").html(data);
        //navigator.notification.alert ('One Record Deleted!', alertDismissed, 'Record', 'OK');
        redirectToHome();
    });
}



//Display student details
function displayDetails(){
    $('#studentdetails').empty();
    $.getJSON('https://mobileapp12.000webhostapp.com/list-student.php', function(data) {
        $.each(data, function(index, data) {
            if(data.ID == studentInfo.ID) {
                $('#studentdetails').append('<li><h5>'+data.Name+'</h5></li>');
                $('#studentdetails').append('<li>ID: '+data.ID+'</li>');
                $('#studentdetails').append('<li>Level: '+data.Level+'</li>');
                $('#studentdetails').append('<li>Status: '+data.Status+'</li>');
                $('#studentdetails').append('<li>Date: '+data.Date+'</li>');
                $('#studentdetails').append('<li>Time: '+data.Time+'</li>');
                $('#studentdetails').append('<li>Location: '+data.Location+'</li>');

            }
         });
         $('#studentdetails').listview('refresh');
         $('#studentID').attr('value',studentInfo.ID);
    });
}

function signout(){
    redirectToStart();
}


//Navigator callback for alert dialog box
function redirectToHome(){
    $.mobile.changePage( "#home", { transition: "slide", changeHash: false, reloadPage: true });
    $(location).attr('href',"index.html");
    $('#liststudent').listview('refresh');
}

function redirectToStart(){
    $.mobile.changePage( "#log", { transition: "slide", changeHash: false, reloadPage: true });
	$(location).attr('href',"start.html");
}




//event triggers
//New Record Button
$('#newrecord').submit(function () {
    storeData();
    return false;
});

//Home Button
$(document).on('click', '#home', function () {
    retrieveData();
});

//Vertical Click from the main listview
$(document).on('vclick', '#liststudent li a', function() {
    studentInfo.ID = $(this).attr('data-id');
    $.mobile.changePage("#details", { transition: "slide", changeHash: false });
});

//display the details
$(document).on('pagebeforeshow', '#details', function(){ 
    displayDetails();
});

//Delete Record Button
$('#deleterecord').submit(function() {
    deleteData();
    return false;
});

$(document).on('click', '#signout', function() {
	signout();
});


