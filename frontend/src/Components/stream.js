import React, { Component }from "react";

class Stream extends Component {
    constructor(props){
        super(props);
        this.state = {
            //TODO: Fill With key_id and secret_key
        }
    }

    // instance of websocket connection as a class property
    ws = new WebSocket('wss://data.alpaca.markets/stream')
    out = "hi"

    componentDidMount() {
        this.ws.onopen = () => {
        // on connecting, do nothing but log it to the console
        console.log('connected')
        }

        this.ws.onmessage = evt => {
        // listen to data sent from the websocket server
        const message = JSON.parse(evt.data)
        this.setState({dataFromServer: message})
        console.log(message)
        }

        this.ws.onclose = () => {
        console.log('disconnected')
        // automatically try to reconnect on connection loss

        }

    }

    render(){
        return("hi")
    }
}

export default Stream;