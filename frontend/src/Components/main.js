import {Component} from "react";
import Control from './control';
import API from './apiHandler';
import Stream from "./stream";

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

        this.connect = this.connect.bind(this);

        this.streamListener = this.streamListener.bind(this);

        this.log = this.log.bind(this);
        this.test = this.test.bind(this);
        this.state = {
            key_id: 'PKHGR6CVRK7DTWFIB6Q1',
            secret_key: 'TpSauKJD8We5hu3vvXzwp2o7UrXBfR4uzxp4Z27n',
            stream: 'stocks',
            ticker: 'TSLA',

            p1: "USD",
            p2: "CAD",
        }

        //TODO: Stream will be a little more complex wrt getting the return data
        //this.ws.subscribe(this.state.ticker)
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

    connect(){
        //Creates new connections to API and Stream, after updating
        if (this.state.stream === "stocks"){
            this.api = new API(this.state.key_id, this.state.secret_key, 'https://paper-api.alpaca.markets')
        }else{
            this.api = null
        }
        
        this.ws = new Stream(this.state.key_id, `wss://socket.polygon.io/${this.state.stream}`, this.streamListener)
    }

    disconnect(){
        //TODO
        //this.ws.disconnect()

    }
    //#endregion

    log(msg){
        console.log(msg)
    }

    streamListener(msg){
        console.log(JSON.parse(msg.data))
        /*TODO
        See old version of stream
        Lots of entangled logic that you'll need to parcel out
        Here specifically you'll just want to update the price
        Updating chart and percent bar logic should be seperate
        */

        //this.setState({data: JSON.parse(msg.data)})

        //TODO: The way we handle the message will depend on what stream type we're listening to
        /*
        //Subscribe to Ticker after Auth Confirmation:
        if (this.state.data[0].message != null){
            console.log(this.state.data[0].message)
            //Subscribe to Stream after authentication confirmation
            if (this.state.data[0].message === 'authenticated'){
                this.ws.subscribe(this.state.ticker)
            }
        }else{
            //Price data here
            console.log(this.state.data[0].p)
        }*/
    }

    test(){
        //let ws = new Stream(this.state.key_id, this.streamListener)
    }


    render(){
        return(
            <div>
                {this.state.data}
                <button onClick={this.test}> Clicky</button>
                {/*{this.state.data[0].p}*/}
                <Control key_id={this.state.key_id} secret_key={this.state.secret_key} ticker={this.state.ticker} stream={this.state.stream} p1={this.state.p1} p2={this.state.p2} idChange={this.idChange} skChange={this.skChange} tickerChange={this.tickerChange} streamChange={this.streamChange} p1Change={this.p1Change} p2Change={this.p2Change} pairSwap={this.pairSwap} connect={this.connect}/>
            </div>
        )
    }
}

export default Main;