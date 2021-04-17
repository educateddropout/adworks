function libUnits(){

    return [
                { 'description' : 'PCS', 'value' : '1' },
                { 'description' : 'PACK', 'value' : '2' }, 
                { 'description' : 'BOX', 'value' : '3' }
            ];


}

function expiredStatusLib(){

    return [
                { 'description' : 'EXPIRED', 'value' : 1 },
                { 'description' : 'NOT YET CONSUMED', 'value' : 2 }, 
                { 'description' : 'CONSUMED', 'value' : 3 }
            ];


}

function productTypeLib(){

    return [
                { 'description' : 'DENTAL SUPPLIES', 'value' : 1 },
                { 'description' : 'EQUIPMENTS', 'value' : 2 }, 
                { 'description' : 'CLEANING SUPPLIES', 'value' : 3 },
                { 'description' : 'OFFICE SUPPLIES', 'value' : 4 },
                { 'description' : 'OTHERS', 'value' : 5 },
            ];


}

function stockLib(){

    return [

                { 'description' : 'OUT OF STOCK', 'value' : 1 },
                { 'description' : 'LOW SUPPLIES', 'value' : 2 }, 
                { 'description' : 'HIGH SUPPLIES', 'value' : 3 },
		          { 'description' : 'NEGATIVES', 'value' : 4 }

            ];


}

function branchLib(){

    return [

                { 'description' : 'KAMUNING', 'value' : 'K' },
                { 'description' : 'MAKATI', 'value' : 'M' }, 
                { 'description' : 'DENTAL ARTS LABORATORY', 'value' : 'D' },
                { 'description' : 'ECODENT DENTAL SUPPLIES', 'value' : 'E' }

            ];

}

function segregateStocks(quantity){

    let retVal = 3;

    if(Number(quantity) == 0) retVal = 1;
    else if(Number(quantity) < 11 && Number(quantity) > 0) retVal = 2;
    else if(Number(quantity) < 0) retVal = 4;

    return retVal;


}

function segregateExpiration(expirationDate, isConsumed){

    let retVal = 3;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var eyyyy = expirationDate.substring(0,4);
    var emm = expirationDate.substring(5,7);
    var edd = expirationDate.substring(8,10);

    if( isConsumed != 'Y' && (Number(eyyyy + emm + edd + "") < Number(yyyy + mm + dd + ""))) retVal = 1;
    else if(isConsumed != 'Y') retVal = 2;

    return retVal;


}


function validateIndex(value){

    let retVal = "";

    if(value == -1){
        retVal = "Please select product";
    }

    return retVal;

}

function validateQuantity(value){

    let retVal = "";

    if(value < 1){
        retVal = "Quantity should be more than 0";
    }

    return retVal;

}

function validatePrice(value){

    let retVal = "";

    if(value < 1){
        retVal = "Price should be more than 0";
    }

    return retVal;

}

function validateQuantity(value, stock){

    let retVal = "";

    if(value < 1){
        retVal = "Quantity should be more than 0";
    }

    return retVal;

}

function validateExpirationDate(date){

    let retVal = "";
    let today = new moment(moment().toISOString(true).substring(0,10));
    let formattedDateToday = today.toISOString(true).substring(0,10);
    
    if(date != ""){
        if(date <= formattedDateToday ) retVal = "Thou shall not get expired product.";
    }

    return retVal;

}

function validateQuantityOutgoing(value, stock, isSaving){

    let retVal = "";

    if(stock == 0 ){
        retVal = "No stocks available.";
    } else {

        if(value < 1 && isSaving){
            retVal = "Quantity should be more than 0";
        }

        if(Number(value) > Number(stock)){
            retVal = `Only ${stock} stock/s left`;
        }

    }

    return retVal;

}

function getLastDayOfTheMonth(month, year){
    let retVal = 0;

    if(month == '01' || month == '03' || month == '05' || month == '07' || month == '08' || month == '10' || month == '12') retVal = "31";
    else if( month == '04' || month == '06' || month == '09' || month == '11') retVal = "30";
    else if( month == '02'){
        if((year%4) == 0) retVal = "29";
        else retVal = "28";
    }

    return retVal;
}

function validateLoginInput(input){
    let retVal = "";

    if(input.trim().length < 1) retVal = "This is required!";

    return retVal;
}

function validateSelection(value){

    let retVal = "";

    if(value == -1){
        retVal = "This is required!";
    }

    return retVal;

}

function validateName(value, requiredCtr){

    let retVal = "";

    if(value.trim().length < 1 && requiredCtr) retVal = "This is required!";
    else{

        if (! /^[a-zA-ZÃƒâ€˜ÃƒÂ±0-9'ÃƒÆ’.\-\s]+$/.test(value)) {
            // Validation failed
            msg = "Found invalid character! Please Check..";

        }
    }

    return retVal;

}

function validateContactNumber(input){

    let retVal = "";
    inputLength = input.length;

    if(! /^[0-9]+$/.test(input)){
        retVal = "Invalid Contact Number.";
    } else{

        if(inputLength == 11 && input.substring(0,2) != '09'){
            retVal = "Cellphone number should start in '09'.";
        }else if(inputLength < 7){
            retVal = "Contact number length should be 8, 9, 10, 11. Including area code.";
        }
        
    }

    return retVal;

}