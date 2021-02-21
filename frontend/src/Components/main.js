import {Component} from "react";
import Draggable from 'react-draggable';
import Control from './control';
import API from './apiHandler';
import Stream from "./stream";

import List from './list';

class Main extends Component{
    constructor(props){
        super(props);
        //Values that get passed to the component

        this.tickerChange = this.tickerChange.bind(this);
        this.idChange = this.idChange.bind(this);
        this.skChange = this.skChange.bind(this);
        this.streamChange = this.streamChange.bind(this);

        this.p1Change = this.p1Change.bind(this);
        this.p2Change = this.p2Change.bind(this);
        this.pairSwap = this.pairSwap.bind(this);

        this.priceListener = this.priceListener.bind(this);
        this.tradeStatusListener = this.tradeStatusListener.bind(this);
        this.apiPositionListener = this.apiPositionListener.bind(this);
        this.connect = this.connect.bind(this);
        this.updatePositions = this.updatePositions.bind(this);

        //this.subscribe = this.subscribe.bind(this);
        //this.unsubscribe = this.unsubscribe.bind(this);

        //this.initPositions = this.initPositions.bind(this);
        //this.get_price = this.get_price.bind(this);

        this.positions = {} // Symbol: [qty, price]

        this.state = {
            key_id: 'PKE06IXOHYSCN0DKRU3M',
            //key_id: 'bvqgf2n48v6qg460kck0',
            secret_key: '1Hv5IIH4niKxwe6uvMSHzVyslejRSwhoiamYCSLQ',

            
            positions: null, //array of [Ticker, qty, avg price] arrays
            streamData: null, //Data from the polygon stream

            stream: 'stocks',
            //stream: 'forex',
            ticker: 'MSFT', // Ticker is the active window ticker symbol

            p1: "USD",
            p2: "CAD",
        }
    }

    //#region Onchange Functions (Called from Control Panel)
    //TODO: May need to update the websocket stream & also the api handler
    //NOTE: Using this.state.[whatever] after setState doesn't seem to update it until the next iteration;
    //Need to directly use e.target.value
    tickerChange(e) {
        this.setState({ticker: e.target.value})
    }
    idChange(e) {
        this.setState({key_id: e.target.value});
    }
    skChange(e) {
        this.setState({secret_key: e.target.value});
    }

    streamChange(e){
        //TODO -> What should the behavior here be wrt to the currently active connections?
        this.setState({stream: e.target.value})
        //this.disconnect()

        //url state is updated in connect()
    }

    //Currency Pair Related Functions
    p1Change(e){
        this.setState({p1: e.target.value})
    }

    p2Change(e){
        this.setState({p2: e.target.value})
    }

    pairSwap(){
        let p1Now = this.state.p1
        let p2Now = this.state.p2
        this.setState({p1: p2Now})
        this.setState({p2: p1Now})
    }
    //#endregion

    
    priceListener(msg){ //Polygon websocket callback; parses incoming data and updates state
        //console.log(msg)
        let data = JSON.parse(msg.data)
        if (data[0].message != null){
            console.log(`Polygon says ${data[0].message}`)
            //initialize positions after authentication confirmation
            if (data[0].message === 'authenticated'){
                //TODO: How to handle the active window?
                //this.ws.subscribe(this.state.ticker)

                //Get Position List After Websocket Confirm
                //alert("Getting Positions")
                this.updatePositions()
            }
        }else{//Message is null, so we assume we're subscribed, and getting price data
            //console.log(JSON.stringify(data))
            //this.setState({streamData: data})

            //Data from WS comes in Asynchronously, so we update the position dict
            for (let datum of data){
                this.positions[datum.sym]["price"] = datum.p
            }
            //alert("Setting Positions")
            this.setState({positions: this.positions})
        }
    }

    tradeStatusListener(msg){ //Alpaca trade updates websocket Listener

        //console.log(msg)
        let data = JSON.parse(msg).data
        if(data.status != null){
            console.log(`Alpaca says ${data.status}`)
            if(data.status === "authorized"){
                //Subscribe to trade status stream
                this.ws.alpaca.send(JSON.stringify({"action":"listen","data":{"streams":["trade_updates"]}}))
            }
        }else if(data.streams != null){
            data.streams.forEach(x => {console.log(`Alpaca is listening to ${x}`)})
        }else{
            
            /*
            console.log(`Second branch Alpaca says ${msg}`)
            console.log(`Event Type: ${data.event}`)
            console.log(`Symbol: ${data.order.symbol}`)
            if(data.event === 'new'){
                console.log(`New order created at ${data.order.limit_price} per share, for ${data.order.qty} shares`)
            }else{
                console.log(`${data.order.filled_qty} orders filled at ${data.order.filled_avg_price}`)
            }*/           
        }
    }

    
    apiPositionListener(msg){
        //alert("API position listener called")

        //Get Alpaca positions list
        for (let position of JSON.parse(msg)){
            //Only subscribe to ws streams if not already subscribed
            if(this.positions[position.symbol] == null){
                this.ws.subscribe(position.symbol)
            }

            //Price defaults to last day price; will get overwritten by WS stream if live
            //alert(`Quantity: ${position.qty}`)
            this.positions[position.symbol] = {qty: position.qty, cost: position.avg_entry_price, price: position.lastday_price}
        }

        this.setState({positions: this.positions})
    }

    //Get new positions from Alpaca without subscribing (Called after sell/buy orders) 
    updatePositions(){
        this.api.get_positions(this.apiPositionListener)
    }



    connect(){
        //Creates new connections to API and Stream
        if (this.state.stream === "stocks"){
            this.api = new API(this.state.key_id, this.state.secret_key, 'https://paper-api.alpaca.markets')
            this.ws = new Stream(this.state.key_id, this.state.secret_key, 'wss://socket.polygon.io/stocks', 'wss://paper-api.alpaca.markets/stream', this.priceListener, this.tradeStatusListener)       
        }else{
            alert("Forex support coming soon!")
            this.setState({stream: "stocks"})
            //this.ws = new Stream(this.state.key_id, `wss://ws.finnhub.io?token=${this.state.key_id}`, this.priceListener)
            //this.api = null
        }
    }

    disconnect(){
        //TODO
        //this.ws.disconnect()

    }


    render(){
        return(
            <div>
                <Draggable><div><List positions={this.state.positions} api={this.api} updatePositions={this.updatePositions}/></div></Draggable>
                <Draggable><div><Control key_id={this.state.key_id} secret_key={this.state.secret_key} ticker={this.state.ticker} stream={this.state.stream} p1={this.state.p1} p2={this.state.p2} idChange={this.idChange} skChange={this.skChange} tickerChange={this.tickerChange} streamChange={this.streamChange} p1Change={this.p1Change} p2Change={this.p2Change} pairSwap={this.pairSwap} connect={this.connect}/></div></Draggable>
            </div>
        )
    }
}

export default Main;