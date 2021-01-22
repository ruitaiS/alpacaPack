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

        this.updatePositions = this.updatePositions.bind(this);

        //this.subscribe = this.subscribe.bind(this);
        //this.unsubscribe = this.unsubscribe.bind(this);

        //this.updatePositions = this.updatePositions.bind(this);
        //this.get_price = this.get_price.bind(this);

        this.state = {
            key_id: 'PKHO52XD6BFXD87F8WP5',
            //key_id: 'bvqgf2n48v6qg460kck0',
            secret_key: 'QxHhpdHZdO5WFAN6EucqX5odwGWZEN4TKvs63dqq',

            //positions: array of [Ticker, qty, avg price] arrays,

            stream: 'stocks',
            //stream: 'forex',
            ticker: 'MSFT',

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
        /*TODO
        See old version of stream
        Lots of entangled logic that you'll need to parcel out
        Here specifically you'll just want to update the price
        Updating chart and percent bar logic should be seperate
        */

        let data = JSON.parse(msg.data)
        //console.log(data)

        //this.setState({data: JSON.parse(msg.data)})

        //TODO: The way we handle the message will depend on what stream type we're listening to
        
        //Stock Websocket Format:
        //Subscribe to Ticker after Auth Confirmation:
        if (data[0].message != null){
            console.log(data[0].message)
            //Subscribe to Stream after authentication confirmation
            if (data[0].message === 'authenticated'){
                this.ws.subscribe(this.state.ticker)
            }
        }else{
            //Message is null, so we assume it is already subscribed to a stream

            //Print the price
            console.log(JSON.stringify(data))
            this.setState({streamData: data})
        }
    }

    
    apiPositionListener(msg){//Parses positions from API, updates state
        let positions = []

        for (let position of JSON.parse(msg)){
            alert(position.symbol)
            positions.push([position.symbol, position.qty, position.avg_entry_price])
        }

        console.log(positions)
    }

    updatePositions(){//Call this every time you enter / exit
            this.api.get_positions(this.apiPositionListener)//Get List of existing positions from api
            //Subscribe to those positions on the stream
            //Store the relevant information in state
    }

    connect(){
        //Creates new connections to API and Stream
        if (this.state.stream === "stocks"){
            this.ws = new Stream(this.state.key_id, 'wss://socket.polygon.io/stocks', this.streamListener)
            this.api = new API(this.state.key_id, this.state.secret_key, 'https://paper-api.alpaca.markets')
            this.updatePositions()            
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
                {/*<List positions={this.state.positions} ws={this.ws} streamData={this.state.streamData} get_price={(ticker)=>this.get_price(ticker)}/>*/}
                <Control key_id={this.state.key_id} secret_key={this.state.secret_key} ticker={this.state.ticker} stream={this.state.stream} p1={this.state.p1} p2={this.state.p2} idChange={this.idChange} skChange={this.skChange} tickerChange={this.tickerChange} streamChange={this.streamChange} p1Change={this.p1Change} p2Change={this.p2Change} pairSwap={this.pairSwap} connect={this.connect}/>
            </div>
        )
    }
}

export default Main;