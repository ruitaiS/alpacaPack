//Based on:
//https://dev.to/finallynero/using-websockets-in-react-4fkp

import {Component} from "react";
import PCTBar from './pctBar';
import Chart from './chart';
import API from './apiHandler';

class Stream extends Component {
    constructor(props){
        super(props);
        //key_id
        //secret_key
        //ticker
        //fakePCT
        this.state = {
            //currPrice
            //holdPrice
            chartData: [],
            pct: null,


            //Testing Buy / Sell Code
            boughtAt: null,
            soldAt: null,
            pctGain: 1,
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
        //console.log(data[0])

        this.setState({currPrice: data[0].p})

        //Pass the Time, Price, Volume data to the chart
        if (this.state.chartData.length >=100){
            this.state.chartData.shift()
        }
        this.state.chartData.push(data[0])

        if (this.state.boughtAt != null){ //Currently in a position
            this.setState({pct: (this.state.currPrice - this.state.boughtAt)/ this.state.boughtAt})
        }else{ //Not in a position; only update pct if holding price
            if (this.state.holdPrice != null){
                //Inverted PCT
                //Buy Price > Current Price = Green; You can buy the stock at (or cheaper) than you wanted
                //Buy Price < Current Price = Red; The stock is more expeensive than your limit price & the order won't go through (immediately)
                this.setState({pct: (this.state.holdPrice-this.state.currPrice)/ this.state.holdPrice})
            }
        }



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
        this.setState({holdPrice: this.state.currPrice})

        //TODO: If you're in a position, and you do mouseover
        //Show the change from buy-in to hold price in one color,
        //change from hold price to current price in another color
    }

    mouseOut(){
        //Reset / remove holdPrice
        console.log("MouseOut")
        this.setState({pct: null})
        this.setState({holdPrice: null})
    }

    click(){
        //Place a limit order at the holdPrice
        console.log("Clicked")
        //this.setState({holdPrice: this.state.price})
        //console.log(this.state.test)

        
        if (this.state.boughtAt != null){
            //Already in a position -> Clicking exits
            if (this.state.currPrice >= this.state.holdPrice){
                this.setState({pctGain: (1+this.state.pct)*this.state.pctGain})
                this.setState({soldAt: this.state.currPrice})
                this.setState({boughtAt: null})
            }
            
        }else{
            //Not in a position -> Clicking enters
            if (this.state.currPrice <= this.state.holdPrice){
                this.setState({soldAt: null})
                this.setState({boughtAt: this.state.currPrice})
            }
        }


    }

    render(){
        let preText
        let buttonText
        let overText

        if (this.state.boughtAt != null){
            preText = "Sell At: "
        }else{
            preText = "Buy At: "
        }

        if (this.state.currPrice != null){
            overText = this.state.currPrice.toFixed(2)
            buttonText = `${preText} ${this.state.currPrice.toFixed(2)}`
        }

        if (this.state.holdPrice != null){
            buttonText = `${preText} ${this.state.holdPrice.toFixed(2)}`
        }


        //Use this.state.pct in place of this.props.fakePCT for live testing
        //First PCT bar shows gains, second is to show price changes
        return(
            <div>
                <Chart data={this.state.chartData}/>
                <PCTBar maxWidth="270" pctChange={this.state.pctGain - 1} scale="1"/>
                <div>`Bought at: ${this.state.boughtAt}`</div>
                <div>`Sold at: ${this.state.soldAt}`</div>
                <div>`Percent Gain: {(this.state.pctGain-1)*100}%`</div>
                <PCTBar maxWidth="270" pctChange={this.state.pct} scale="1"/>
                <div>{overText}</div>
                {/*<div><button className="streamBtn" onClick={this.click} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>{buttonText}</button></div>*/}
                <API click={this.click} mouseOver={this.mouseOver} mouseOut={this.mouseOut} buttonText={buttonText}/>
            </div>)
    }
}

export default Stream;