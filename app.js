
var request = require('request');
var each = require('foreach');

setInterval(function(){
    var coin="USDT-BTC";
    request('https://bittrex.com/api/v1.1/public/getmarkethistory?market='+coin+'&type=both', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);
            var arr=(obj.result);
            var sell=0;
            var buy=0;
            each(arr, function (value, key, array) {

                if(value.OrderType==="SELL"){
                    sell +=value.Quantity;
                }
                if(value.OrderType==="BUY"){
                    buy +=value.Quantity;
                }
            });

            var date = new Date()

            console.log('\x1b[28m%s\x1b[0m',"\n~(Bittrex Bitcoin Order History)~");
            console.log("["+date+"]\n");
            console.log('\x1b[31m%s\x1b[0m',"Sell : "+currency(eval(sell),8) + " BTC");
            console.log('\x1b[32m%s\x1b[0m',"Buy : "+currency(eval(buy),8) +" BTC");

        }
    });

}, 5000);

function currency(input,number) {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: number,
        maximumFractionDigits: number,
        useGrouping: false
    }).format(input);
}