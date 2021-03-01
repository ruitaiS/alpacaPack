//Based on:
//https://dev.to/finallynero/using-websockets-in-react-4fkp

//Uses the finnhub websocket for trades
//https://finnhub.io/docs/api/websocket-trades


//TODO: This will need different methods depending on which websocket is being used, since they all seem to have different formats and standards
//For now just use the stocks endpoint to build everything out

class Stream{
    //constructor(key_id, url, callback){
    constructor(key_id, secret_key, finnhubURL, alpacaURL, finnhubCallback, alpacaCallback, fhConnect){
        this.finnhub = new WebSocket(finnhubURL) //Live Price Stream
        this.alpaca = new WebSocket(alpacaURL) //Trade Status Updates Stream


        //this.subscriptionList = [];

        //Send Authentication Message On Open:
        //TODO: Error handling on failure to authenticate        
        this.finnhub.onopen = () => {
            console.log("Connected to FinnHub Price Stream")
            fhConnect()
            //this.polygon.send(JSON.stringify({"action":"auth","params": key_id}))
        }
        this.alpaca.onopen = () => {
            console.log("Authenticating Alpaca Trade Updates Stream")
            this.alpaca.send(JSON.stringify({"action":"authenticate","data": {"key_id": key_id, "secret_key":secret_key}}))
        }

        //TODO: Could I just use onmessage = callback(msg)?
        this.finnhub.onmessage = msg => {
            finnhubCallback(msg)
        }
        this.alpaca.onmessage = msg => {
            //msg.data is a blob containing a promise
            //text() uncovers the promise, then() is the callback on promise resolution
            //res is the actual json string
            msg.data.text().then(res => {
                alpacaCallback(res)
            })
        }

        this.finnhub.onclose = () =>{
            console.log("Disconnected from Price Stream")
        }
        this.alpaca.onclose = () =>{
            console.log("Disconnected from Trade Updates Stream")
        }
    }

    //For Trade Stream Only:
    subscribe(ticker){
        console.log(`Subscribing to ${ticker}`)
        this.finnhub.send(JSON.stringify({'type':'subscribe', 'symbol': ticker}))
    }

    unsubscribe(ticker){
        console.log(`Unsubscribing from ${ticker}`)
        this.finnhub.send(JSON.stringify({'type':'unsubscribe', 'symbol': ticker}))
    }

    disconnect(){
        this.finnhub.close()
        this.alpaca.close()
    }
}

export default Stream;