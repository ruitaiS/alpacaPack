//Based on:
//https://dev.to/finallynero/using-websockets-in-react-4fkp

import React, { Component }from "react";

class Stream extends Component {
    constructor(props){
        super(props);
        this.state = {
            key_id: props.key_id,
            secret_key: props.secret_key,
            ticker: props.ticker,
        }
    }

    // instance of websocket connection as a class property
    ws = new WebSocket('wss://socket.polygon.io/stocks')

    componentDidMount() {
        this.ws.onopen = () => {
        // on connecting, do nothing but log it to the console
        console.log('connected')
        let auth_data = {"action":"auth","params": this.state.key_id}
    
        this.ws.send(JSON.stringify(auth_data))

        //Make this generic
        let listen_message = {"action":"subscribe","params":"T."+this.state.ticker}

        this.ws.send(JSON.stringify(listen_message))            


        }

        this.ws.onmessage = evt => {

        let data = JSON.parse(evt.data)
        console.log(data[0].p)

        this.setState({price: data[0].p})
        }

        this.ws.onclose = () => {
        console.log('disconnected')
        // automatically try to reconnect on connection loss

        }

    }

    render(){
    return(<button>{this.state.price}</button>)
    }
}

export default Stream;