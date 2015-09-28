
$(function(){
	resetAlerts();
	main();
});

function main(){
	//Binding Event on submit button
	$("#doValidation").on("click",doProcess);
}

function doProcess(){
	resetAlerts();
	var enteredNumbers = $.trim($("#numbers").val());
	// Validation for null or empty check
	if(!enteredNumbers){
		showErrorAlert("Please enter number");
		return;
	}
	// Getting inputed number array
	var numbersArray = getNumbersArray(enteredNumbers);
	if(numbersArray && numbersArray.length>0){
		showResult(numbersArray);
	}
}

function showResult(numbersArray){
	// Getting from existing Array from configuration
	var existingArray = bookMyShow.part1.existingArray;
	var duplicateNumbers = new Array();
	var uniqueNumbers = new Array();
	doNumberArrayProcessing(numbersArray,existingArray,duplicateNumbers,uniqueNumbers);
	showErrorAlert("Duplicate Numbers : "+duplicateNumbers);
	showSuccessAlert("Unique Numbers : "+uniqueNumbers);
}

function doNumberArrayProcessing(numbersArray,existingArray,duplicateNumbers,uniqueNumbers){
	// Logic for finding duplicate and unique numbers
	$.each(numbersArray, function(key,value){
		var isNumberFound = false;
		$.each(existingArray, function(eKey, eValue){
			if(value == eValue){
				isNumberFound = true;
				return;
			}
		});
		
		if(isNumberFound){
			duplicateNumbers.push(value);
		}else{
			uniqueNumbers.push(value);
		}
	});
}

function getNumbersArray(enteredNumbers){
	var numbers = enteredNumbers.split(",");
	var numbersArray = new Array();
	var isNumberExist = true;
	$.each(numbers, function(key,value){
		var number = $.trim(value);
		if(isNaN(number)){
			if(number.indexOf("-") != -1){
				isNumberExist = genNumberRange(number,numbersArray);
			}else{
				isNumberExist = false;
			}
			
			if(!isNumberExist){
				showErrorAlert("Please provide correct numbers");
				return null;
			}
		}else if(number){
			numbersArray.push(parseInt(number));
		}
	});
	
	if(isNumberExist){
		return numbersArray;
	}else{
		return null;
	}
}

function genNumberRange(number,numbersArray){
	var numberRange = number.split("-");
	var startNumber = $.trim(numberRange[0]);
	var endNumber = $.trim(numberRange[1]);
	var isValidNumberRange = false;
	if(!isNaN(startNumber) && !isNaN(endNumber)){
		startNumber = parseInt(startNumber);
		endNumber = parseInt(endNumber);
		if(startNumber<endNumber){
			var n = startNumber;
			while(n<=endNumber){
				numbersArray.push(n++);
			}
			isValidNumberRange = true;
		}
	}
	return isValidNumberRange;
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