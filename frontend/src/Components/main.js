import {Component} from "react";
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

        this.streamListener = this.streamListener.bind(this);
        this.connect = this.connect.bind(this);
        this.apiPositionListener = this.apiPositionListener.bind(this);

        //this.subscribe = this.subscribe.bind(this);
        //this.unsubscribe = this.unsubscribe.bind(this);

        //this.initPositions = this.initPositions.bind(this);
        //this.get_price = this.get_price.bind(this);

        this.positions = {} // Symbol: [qty, price]

        this.state = {
            key_id: 'PK5YYD0RTSIBEH5O4IG7',
            //key_id: 'bvqgf2n48v6qg460kck0',
            secret_key: 'vbrBfUR0BkmsjtR13sB0mxqYOPQqaR67ARJoZO4P',

            
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

    
    streamListener(msg){ //websocket callback; parses incoming data and updates state
        let data = JSON.parse(msg.data)
        if (data[0].message != null){
            console.log(data[0].message)
            //initialize positions after authentication confirmation
            if (data[0].message === 'authenticated'){
                //TODO: How to handle the active window?
                //this.ws.subscribe(this.state.ticker)

                //Get Position List After Websocket Confirm
                //alert("Getting Positions")
                this.api.get_positions(this.apiPositionListener) 
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

    
    apiPositionListener(msg){
        //After getting Alpaca positions list, subscribes to the necessary streams through polygon
        for (let position of JSON.parse(msg)){
            alert(position.symbol)
            this.positions[position.symbol] = {qty: position.qty, cost: position.avg_entry_price}
            this.ws.subscribe(position.symbol)
        }
    }

    connect(){
        //Creates new connections to API and Stream
        if (this.state.stream === "stocks"){
            this.api = new API(this.state.key_id, this.state.secret_key, 'https://paper-api.alpaca.markets')
            this.ws = new Stream(this.state.key_id, 'wss://socket.polygon.io/stocks', this.streamListener)          
        }else{
            alert("Forex support coming soon!")
            this.setState({stream: "stocks"})
            //this.ws = new Stream(this.state.key_id, `wss://ws.finnhub.io?token=${this.state.key_id}`, this.streamListener)
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
                <List positions={this.state.positions} api={this.api}/>
                <Control key_id={this.state.key_id} secret_key={this.state.secret_key} ticker={this.state.ticker} stream={this.state.stream} p1={this.state.p1} p2={this.state.p2} idChange={this.idChange} skChange={this.skChange} tickerChange={this.tickerChange} streamChange={this.streamChange} p1Change={this.p1Change} p2Change={this.p2Change} pairSwap={this.pairSwap} connect={this.connect}/>
            </div>
        )
    }
}

export default Main;