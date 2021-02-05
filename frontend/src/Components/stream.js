//Based on:
//https://dev.to/finallynero/using-websockets-in-react-4fkp

//Uses the Polygon websocket for trades rather than the alpaca one. Documentation here:
//https://polygon.io/sockets


//TODO: This will need different methods depending on which websocket is being used, since they all seem to have different formats and standards
//For now just use the stocks endpoint to build everything out

class Stream{
    //constructor(key_id, url, callback){
    constructor(key_id, secret_key, polygonURL, alpacaURL, polygonCallback, alpacaCallback){
        this.polygon = new WebSocket(polygonURL) //Live Price Stream
        this.alpaca = new WebSocket(alpacaURL) //Trade Status Updates Stream


        //this.subscriptionList = [];

        //Send Authentication Message On Open:
        //TODO: Error handling on failure to authenticate        
        this.polygon.onopen = () => {
            console.log("Authenticating Price Stream")
            this.polygon.send(JSON.stringify({"action":"auth","params": key_id}))
        }
        this.alpaca.onopen = () => {
            console.log("Authenticating Trade Updates Stream")
            this.alpaca.send(JSON.stringify({"action":"authenticate","data": {"key_id": key_id, "secret_key":secret_key}}))
        }

        //TODO: Could I just use onmessage = callback(msg)?
        this.polygon.onmessage = msg => {
            polygonCallback(msg)
        }
        this.alpaca.onmessage = msg => {
            alpacaCallback(msg)
        }

        this.polygon.onclose = () =>{
            console.log("Disconnected from Price Stream")
        }
        this.alpaca.onclose = () =>{
            console.log("Disconnected from Trade Updates Stream")
        }
    }

    //For Trade Stream Only:
    subscribe(ticker){
        this.polygon.send(JSON.stringify({"action":"subscribe","params":"T."+ticker}))
    }

    unsubscribe(ticker){
        this.polygon.send(JSON.stringify({"action":"unsubscribe","params":"T."+ticker}))
    }

    disconnect(){
        this.polygon.close()
        this.alpaca.close()
    }
}

export default Stream;