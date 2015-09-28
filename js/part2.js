$(function(){
	resetAlerts();
	main();
});

function main(){
	//Binding Event on submit button
	$("#checkRotational").on("click",checkRotationalString);
}

function checkRotationalString(){
	resetAlerts();
	// Getting the values from text boxes
	var originalString  = $("#originalString").val();
	var rotationalString = $("#rotatedString").val();
	var isRotated = false;
	
	// Logic for checking rotational string
	if(originalString.length == rotationalString.length){
		var originalStringCon = originalString+originalString;
		if(originalStringCon.indexOf(rotationalString)!= -1){
			isRotated = true;
		}
	}
	
	if(isRotated){
		showSuccessAlert("String is rotated");
	}else{
		showErrorAlert("String is not rotated");
	}
}

function resetAlerts(){
	$("#error-alert").hide();
	$("#success-alert").hide();
	$("#error-msg").empty();
	$("#success-msg").empty();
}

function showErrorAlert(errorMsg){
	$("#error-msg").empty();
	$("#error-msg").text(errorMsg);
	$("#error-alert").show();
}

function showSuccessAlert(successMsg){
	$("#success-msg").empty();
	$("#success-msg").text(successMsg);
	$("#success-alert").show();
}