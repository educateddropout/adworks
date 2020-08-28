function libUnits(){

    return [
                { 'description' : 'PCS', 'value' : '1' },
                { 'description' : 'PACK', 'value' : '2' }, 
                { 'description' : 'BOX', 'value' : '3' }
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
                { 'description' : 'HIGH SUPPLIES', 'value' : 3 }

            ];


}

function branchLib(){

    return [

                { 'description' : 'KAMUNING', 'value' : 'K' },
                { 'description' : 'MAKATI', 'value' : 'M' }, 

            ];

}

function segregateStocks(quantity){

    let retVal = 3;

    if(Number(quantity) == 0) retVal = 1;
    else if(Number(quantity) < 11) retVal = 2;

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