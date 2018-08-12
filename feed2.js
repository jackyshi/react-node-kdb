var WebSocket = require('ws');
var c = require('./c');
console.log(typeof c.serialize); 
console.log(typeof c.deserialize); 
var startFlag = true;

function connectKDB() {
    var ws = new WebSocket("ws://localhost:5001");
    ws.binaryType = 'arraybuffer';
    ws.onopen=function(e){
        // on successful connection, we want to create an initial subscription to load all the data into the page
        ws.send(c.serialize(['loadPage',[]]));
    };

    ws.onclose=function(e){
        console.log("disconnected");
    };
    
    ws.onmessage=function(e){
        // deserialise incoming messages
        var d = c.deserialize(e.data);
    // messages should have format [‘function’,params]
        // call the function name with the parameters
        //global[d.shift()](d[0]);
        if(startFlag) {
            switch (d.shift()) {
                case "getQuotes":
                    global["getQuotes"](d[0]);
                    break;
                case "getTrades":
                    global["getTrades"](d[0]);
                    break;
                case "getSyms":
                    global["getSyms"](d[0]);
            }
        }
        //global["getQuotes"](d[0]);
    };
    
    ws.onerror=function(e){
        console.log(e.data);
    };

}

function start(onChange) {
    connectKDB();
    onChangeHandler = onChange;
    startFlag = true;
}

function stop() {
    startFlag = false;
}

exports.start = start;
exports.stop = stop;

getQuotes=function(data) {
    console.log(data);
    data.forEach(function(element) {
        console.log(element);
        let stock = {};
        stock["symbol"] = element.sym;
        stock["last"] = element.bid.toFixed(2) ;
        stock["high"] = element.ask.toFixed(2) ;
        stock["low"]  = element.bid.toFixed(2) ;
        stock["change"] = (element.ask - element.bid).toFixed(2) ;
        
        onChangeHandler(stock.symbol, 'stock', stock);
      });
}

getTrades=function(data) {
    //console.log(data);

}

getSyms=function(data) {
    //console.log(data);
}