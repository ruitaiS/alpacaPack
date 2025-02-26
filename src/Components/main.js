import {Component} from "react";

import Control from './control';
import API from './apiHandler';
import Stream from "./stream";
import BumpStrat from './strats/bump';

//import config from './config.json'

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
        this.disconnect = this.disconnect.bind(this);
        this.updatePositions = this.updatePositions.bind(this);

        this.fhConnect = this.fhConnect.bind(this);

        this.logPos = this.logPos.bind(this);
        this.clearOrders = this.clearOrders.bind(this);

        this.positions = {} // Symbol: [qty, price]

        this.state = {
            key_id: 'PKW3I9RKUMW268FBKY4H',
            secret_key: 'Bvctrlb0EdjfBiX12zWNoS0mwG9qd33V2kgRNusJ',

            
            positions: null, //array of [Ticker, qty, avg price] arrays
            streamData: null, //Data from the polygon stream

            stream: 'stocks',
            //stream: 'forex',
            ticker: 'XPEV', // Ticker is the active window ticker symbol

            p1: "USD",
            p2: "CAD",

            connected: false,

            test: true,
        }
    }

    //#region Onchange Functions (Called from Control Panel)
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

    priceListener(msg){
        //console.log(msg)
        //console.log(JSON.parse(msg.data).data[0])

        let data = JSON.parse(msg.data)
        if (data.type === "trade"){
            for (let datum of data.data){
                this.positions[datum.s]["value"] = datum.p
            }
        }
        this.setState({positions: this.positions})
    }

    tradeStatusListener(msg){ //Alpaca trade updates websocket Listener
        //https://alpaca.markets/docs/api-documentation/api-v2/streaming/

        //console.log(msg)
        let data = JSON.parse(msg).data
        if(data.status != null){
            console.log(`main/tradeStatusListener: Alpaca says ${data.status}`)
            if(data.status === "authorized"){
                //Subscribe to trade status stream
                this.ws.alpaca.send(JSON.stringify({"action":"listen","data":{"streams":["trade_updates"]}}))
            }
        }else if(data.streams != null){
            data.streams.forEach(x => {console.log(`main/tradeStatusListener: Alpaca is listening to ${x}`)})
        }else{

            /*
                Not 100% sure how to handle order updating in an efficient way.
                RN I'm just keeping a list of pending orders, which get cleared as they are filled,
                and a single entry for the previous fill order, so that child components can check it for updates

                Could there maybe be a situation where the child isn't able to process the fill orders before it gets wiped?
            */
            
            if(data.event === 'new'){
                console.log(`main/tradeStatusListener: New order created to ${data.order.side} at ${data.order.limit_price} per share, for ${data.order.qty} shares`)
                this.positions[data.order.symbol]["orders"][data.order.id] = {[data.order.side]: data.order.qty, price: data.order.limit_price, status: "open"}
            }else if (data.event === "fill"){
                console.log(`main/tradeStatusListener: ${data.order.filled_qty} orders filled at ${data.order.filled_avg_price}`)
                //update order status with fill price
                //if sell, then check if we've liquidated
                if(data.order.side === "sell" && this.positions[data.order.symbol].qty <= data.order.filled_qty){
                    //alert("Sell filled")
                    this.positions[data.order.symbol] = {qty: 0, entry_price: null, exit_price: parseFloat(data.order.filled_avg_price), value: null, orders: {}}
                }
                this.updatePositions()
            
            //TODO: These two
            }else if(data.event === "partial_fill"){
                //This logic doesn't work properly afaik
                console.log("main/tradeStatusListener: Partial Order Fill")
                this.updatePositions()
                console.log(`main/tradeStatusListener: ${data.order.filled_qty} orders filled at ${data.order.filled_avg_price}`)
            }else if (data.event === "canceled"){
                console.log(`main/tradeStatusListener: Order ${data.order.id} was canceled`)
                this.positions[data.order.symbol] = {qty: 0, entry_price: null, exit_price: null, value: null, orders: {}}
                this.updatePositions()
                //Log the cancellation; don't delete outright
                //Child components will listen for updates & update positions once they see them
            }else{
                //expired
                //done_for_day
                //replaced
                //Or could be some other stuff
                console.log(`main/tradeStatusListener: ${data.event}`)
            }
        }
    }

    apiPositionListener(msg){
        //Get Alpaca positions list
        for (let position of JSON.parse(msg)){
            //Only subscribe to ws streams if not already subscribed
            if(this.positions[position.symbol] == null){
                this.ws.subscribe(position.symbol)
            }
            //Price defaults to last day price; will get overwritten by WS stream if live
            this.positions[position.symbol] = {qty: position.qty, entry_price: parseFloat(position.avg_entry_price), exit_price: null, value: position.lastday_price, orders: {}}
        }

        this.setState({positions: this.positions})
    }

    //Get new positions from Alpaca without subscribing (Called after sell/buy orders) 
    updatePositions(){
        this.api.get_positions(this.apiPositionListener)
    }

    /*
    storeConfig(){
        let res = "data:application/octet-stream,"
        res += encodeURIComponent(JSON.stringify(config))
        window.open(res);
    }
    */

    fhConnect(){
        //New for Feb 28
        //Previously only done on polygon ws auth confirm
        this.ws.subscribe(this.state.ticker)
        this.updatePositions()
        this.setState({connected: true})
    }

    connect(){
        //Creates new connections to API and Stream
        if (this.state.stream === "stocks"){
            this.positions[`${this.state.ticker}`] = {qty: 0, entry_price: null, exit_price: null, value: null, orders: {}}
            this.api = new API(this.state.key_id, this.state.secret_key, 'https://paper-api.alpaca.markets')
            this.ws = new Stream(this.state.key_id, this.state.secret_key, 'wss://ws.finnhub.io?token=c0ui7on48v6r6g576j60', 'wss://paper-api.alpaca.markets/stream', this.priceListener, this.tradeStatusListener, this.fhConnect)

            //TODO: Update with existing orders. For now just log
            this.api.get_orders((msg)=>console.log(`main/connect: Existing Orders: ${msg}`))
        }else{
            alert("Forex support coming soon!")
            this.setState({stream: "stocks"})
            //this.ws = new Stream(this.state.key_id, `wss://ws.finnhub.io?token=${this.state.key_id}`, this.priceListener)
            //this.api = null
        }
    }

    disconnect(){
        for (let symbol in this.positions){
            this.ws.unsubscribe(symbol)
        }
        this.ws.disconnect()
        this.setState({positions: null})
        this.setState({connected: false})
    }

    logPos(){
        this.updatePositions()
        console.log(JSON.stringify(this.state.positions))
    }

    clearOrders(symbol, orderID){
        if (orderID == null){
            this.positions[symbol]["orders"]= null
        }else{
            delete this.positions[symbol]["orders"][orderID]
        }

    }

    render(){
        return(
            <div>
                {/*
                <List positions={this.state.positions} api={this.api} updatePositions={this.updatePositions}/>
                <button onClick={this.storeConfig}>Save List</button>
                */}

                <div className="centered">                
                    <Control key_id={this.state.key_id} secret_key={this.state.secret_key} ticker={this.state.ticker} stream={this.state.stream} p1={this.state.p1} p2={this.state.p2} idChange={this.idChange} skChange={this.skChange} tickerChange={this.tickerChange} streamChange={this.streamChange} p1Change={this.p1Change} p2Change={this.p2Change} pairSwap={this.pairSwap} connect={this.connect} disconnect={this.disconnect} connected={this.state.connected}/>
                    
                    {/*Display Strat box only after price feed is live */}
                    {this.state.positions != null &&
                    <BumpStrat test={this.state.test} api={this.api} ticker={this.state.ticker} value={this.state.positions[this.state.ticker]["value"]} positions={this.state.positions[this.state.ticker]}/>
                    }

                    <div className="centeredRow">
                        {/*Show Positions in Console */}
                        <button onClick={this.logPos}>Log Positions</button>
                    </div>
            </div>

            </div>
        )
    }
}

export default Main;