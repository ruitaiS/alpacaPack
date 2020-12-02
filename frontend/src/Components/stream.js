import React, { Component }from "react";

class Stream extends Component {
    constructor(props){
        super(props);
        this.state = {
            key_id: 'PKHGR6CVRK7DTWFIB6Q1',
            secret_key: 'TpSauKJD8We5hu3vvXzwp2o7UrXBfR4uzxp4Z27n',
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

        let listen_message = {"action": "listen", "data": {"streams": ["T.TSLA"]}}

        this.ws.send(JSON.stringify(listen_message))            


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
        return("Hi")
    }
}

export default Stream;