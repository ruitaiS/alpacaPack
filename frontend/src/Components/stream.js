//Based on:
//https://dev.to/finallynero/using-websockets-in-react-4fkp

//Uses the Polygon websocket rather than the alpaca one. Documentation here:
//https://polygon.io/sockets


//TODO: This will need different methods depending on which websocket is being used, since they all seem to have different formats and standards
//For now just use the stocks endpoint to build everything out

class Stream{
    constructor(key_id, url, callback){
        //Stocks Websocket
        this.ws = new WebSocket(url)
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

        this.subbedList = [] // List of subscribed symbols

    }

    //TODO: These are only for the stock cluster; will need changes for forex / crypto
    //TODO: Check if you can do this more than once, & how the response actually comes through
    subscribe(ticker){
        this.ws.send(JSON.stringify({"action":"subscribe","params":"T."+ticker}))
        this.subbedList.push(ticker)
    }

    unsubscribe(ticker){
        this.ws.send(JSON.stringify({"action":"unsubscribe","params":"T."+ticker}))

        //Remove the symbol from the subbed list
        let index = this.subbedList.indexOf(ticker)
        if(index>-1){this.subbedList.splice(index, 1)}
    }

    disconnect(){
        this.ws.close()
    }
}

export default Stream;