// Programmer: Larry Battle 
// Date: Mar 06, 2011
// Purpose: Calculate standard deviation, variance, and average among an array of numbers.

var isArray = function (obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
},
getNumWithSetDec = function( num, numOfDec ){
    var pow10s = Math.pow( 10, numOfDec || 0 );
    return ( numOfDec ) ? Math.round( pow10s * num ) / pow10s : num;
},
getAverageFromNumArr = function( numArr, numOfDec ){
    if( !isArray( numArr ) ){ 
        return false; 
    }
    
    var i = numArr.length, 
        sum = 0;

    while( i-- ){
        sum += numArr[ i ];
    }
    return getNumWithSetDec( (sum / numArr.length ), numOfDec );
},
getVariance = function( numArr, numOfDec ){
    if( !isArray(numArr) ){ 
        return false; 
    }
    
    var avg = getAverageFromNumArr( numArr, numOfDec ), 
        i = numArr.length,
        v = 0;
 
    while( i-- ){
        v += Math.pow( (numArr[ i ] - avg), 2 );
    }

    v /= numArr.length;
    return getNumWithSetDec( v, numOfDec );
},
getStandardDeviation = function( numArr, numOfDec ){
    if( !isArray(numArr) ){ return false; }
    var stdDev = Math.sqrt( getVariance( numArr, numOfDec ) );
    return getNumWithSetDec( stdDev, numOfDec );
};

exports.getQuestionVariance= function(stats) {
    var precision = 4,
        varianceArray = [];


    //this will flatten out the stats array so we can get the variance
    for (var i = 0; i < stats.length; i++) {
        
        if(i == 0 || stats[i].total == 0) { 
            continue; // Don't know - ignore
        }

         for (var j = 0; j < stats[i].total; j++) {
            varianceArray.push(i);
         }
    };

    return varianceArray.length == 0 ? 0 :  getStandardDeviation(varianceArray , precision);
}

