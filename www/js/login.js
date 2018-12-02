// when index html is loaded
$(window).on("load", function (){ document.addEventListener("deviceready", onDeviceReady, false); });

//When device is ready load console log for notification plugin
function onDeviceReady(){
    console.log(navigator.notification);
	retrieveData();
	console.log(navigator.camera);
}



function signup(){
	var postData1 = $('#register').serialize();
	console.log(postData1);
	$.get("https://mobileapp12.000webhostapp.com/signup.php", postData1, function(data) { 
        $(".result").html(data);
        
        redirectToStart();
    });
}

function login(){
	$.ajax({ type: "GET", url: 'https://mobileapp12.000webhostapp.com/login.php', data: {
			username: $("#nama").val(),
			pass: $("#katakunci").val()},
			success: function(data)
			{
				var pggil = $.trim(data);
				if (pggil == '0'){
					alert("Incorrect username or password");
					window.location.replace('#log');
				}else if (pggil == '1'){
					window.location.replace('index.html');
				}else{
					alert("Please try again later");
					window.location.replace('#log');
				}
			}
	});
	return false;
}

function getPicture(){
    navigator.camera.getPicture(onSuccessGetPicture, onErrorGetPicture, {
quality: 50, 
destinationType: Camera.DestinationType.FILE_URI,
sourceType:Camera.PictureSourceType.SAVEDPHOTOALBUM });
}

function onSuccessGetPicture(imageURI) {
        var image = document.getElementById('imageView');
        image.src = imageURI;
}

function onErrorGetPicture() {
    alert ('onError!' + message);
}

//Take picture using device camera
function takePicture() {
    navigator.camera.getPicture(onSuccessTakePicture, onErrorTakePicture, {
quality: 50, destinationType: Camera.DestinationType.FILE_URI,
sourceType:Camera.PictureSourceType.CAMERA });
}

function onSuccessTakePicture(imageURI) {
        var image = document.getElementById('imageView');
        image.src = imageURI;
}

function onErrorTakePicture() {
    alert ('onError!' + message);
}

//event triggers

function redirectToHome(){
    $.mobile.changePage( "#home", { transition: "slide", changeHash: false, reloadPage: true });
	$(location).attr('href',"index.html");
}

function redirectToStart(){
    $.mobile.changePage( "#log", { transition: "slide", changeHash: false, reloadPage: true });
	$(location).attr('href',"start.html");
}


$('#register').submit(function() {
    signup();
    return false;
});

$('#masuk').submit(function() {
    login();
    return false;
});

$(document).on('click', '#takePicture', function () {
    takePicture();
});

$(document).on('click', '#getPicture', function () {
    getPicture();
});

