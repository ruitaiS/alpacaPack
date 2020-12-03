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
    ws = new WebSocket('wss://data.alpaca.markets/stream')

    componentDidMount() {
        this.ws.onopen = () => {
        // on connecting, do nothing but log it to the console
        console.log('connected')
        let auth_data = {
            "action": "authenticate",
            "data": {"key_id": this.state.key_id, "secret_key": this.state.secret_key}
        }
    
        this.ws.send(JSON.stringify(auth_data))

        //Make this generic
        let listen_message = {"action": "listen", "data": {"streams": ["T."+this.state.ticker]}}

        this.ws.send(JSON.stringify(listen_message))            


        }

        this.ws.onmessage = evt => {

        let data = JSON.parse(evt.data)
        console.log(data.data.p)

        this.setState({price: data.data.p})
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