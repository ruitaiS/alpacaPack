//Based on:
//https://dev.to/finallynero/using-websockets-in-react-4fkp

//Uses the Polygon websocket rather than the alpaca one. Documentation here:
//https://polygon.io/sockets

class Stream{
    constructor(key_id, callback){
        //Stocks Websocket
        this.ws = new WebSocket('wss://socket.polygon.io/stocks')
        console.log("test")

        //Send Authentication Message On Open:
        //TODO: Error handling on failure to authenticate        
        this.ws.onopen = () => {
            console.log("Authenticating")
            this.ws.send(JSON.stringify({"action":"auth","params": key_id}))
        }

        this.ws.onclose = () =>{
            console.log("Disconnected")
        }

        //TODO: Could I just use onmessage = callback(msg)?
        this.ws.onmessage = msg => {
            callback(msg)
        }


    }

    //TODO: Check if you can do this more than once, & how the response actually comes through
    subscribe(ticker){
        this.ws.send(JSON.stringify({"action":"subscribe","params":"T."+ticker}))
    }

    unsubscribe(ticker){
        this.ws.send(JSON.stringify({"action":"unsubscribe","params":"T."+ticker}))
    }
}

export default Stream;