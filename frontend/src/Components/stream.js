//Based on:
//https://dev.to/finallynero/using-websockets-in-react-4fkp

import {Component} from "react";
import HealthBar from './healthBar';

class Stream extends Component {
    constructor(props){
        super(props);
        this.state = {
        }

        //Bind this to its functions
        this.click = this.click.bind(this)
        this.mouseOver = this.mouseOver.bind(this)
        this.mouseOut = this.mouseOut.bind(this)
    }

    //Stocks Websocket
    ws = new WebSocket('wss://socket.polygon.io/stocks')

    //Forex Websocket
    //ws = new WebSocket('wss://socket.polygon.io/forex')

    componentDidMount() {
        this.ws.onopen = () => {
        console.log('connected')

        let auth_data = {"action":"auth","params": this.props.key_id}
        this.ws.send(JSON.stringify(auth_data))

        let listen_message = {"action":"subscribe","params":"T."+this.props.ticker}
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

    mouseOver(){
        //Store current stream price
        //We want this to only run once, and then stop updating
        console.log("Mouseover")
        this.setState({buyPrice: this.state.price})
    }

    mouseOut(){
        //Reset / remove buyPrice
        console.log("MouseOut")
        this.setState({buyPrice: null})
    }

    click(){
        //Place a limit order at the buyPrice
        console.log("Clicked")
        this.mouseOver()
        //this.setState({buyPrice: this.state.price})
        //console.log(this.state.test)


    }



    render(){
        let buttonText = this.state.price
        if (this.state.buyPrice != null){
            buttonText = this.state.buyPrice
        }

        return(
            <div>
                <div>{this.state.price}</div>
                <div><button class="streamBtn" onClick={this.click} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>{buttonText}</button></div>
            </div>)
    }
}

export default Stream;