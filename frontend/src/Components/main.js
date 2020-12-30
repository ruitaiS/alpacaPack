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

        this.streamListener = this.streamListener.bind(this);

        this.log = this.log.bind(this);
        this.test = this.test.bind(this);
        this.state = {
            key_id: 'PKHGR6CVRK7DTWFIB6Q1',
            secret_key: 'TpSauKJD8We5hu3vvXzwp2o7UrXBfR4uzxp4Z27n',
            ticker: 'TSLA',
        }

        this.api = new API(this.state.key_id, this.state.secret_key, 'https://paper-api.alpaca.markets')

        //TODO: Stream will be a little more complex wrt getting the return data
        this.ws = new Stream(this.state.key_id, this.streamListener)
        //this.ws.subscribe(this.state.ticker)
    }

    //#region Onchange Functions (Called from Control Panel)
    //TODO: May need to update the websocket stream & also the api handler
    //NOTE: Using this.state.[whatever] after setState doesn't seem to update it until the next iteration;
    //Need to directly use e.target.value
    tickerChange(e) {
        this.ws.unsubscribe(this.state.ticker)
        this.setState({ticker: e.target.value});
        this.ws.subscribe(e.target.value)
    }
    idChange(e) {
        this.setState({key_id: e.target.value});
        this.api.idChange(e.target.value)
        this.ws = new Stream(e.target.value, this.streamListener)
    }
    skChange(e) {
        this.setState({secret_key: e.target.value});
        this.api.skChange(e.target.value)
    }
    //#endregion

    log(msg){
        console.log(msg)
    }

    streamListener(msg){
        console.log(msg)
        /*TODO
        See old version of stream
        Lots of entangled logic that you'll need to parcel out
        Here specifically you'll just want to update the price
        Updating chart and percent bar logic should be seperate
        */
    }

    test(){
        //let ws = new Stream(this.state.key_id, this.streamListener)
    }


    render(){
        return(
            <div>
                {this.state.key_id}
                <button onClick={this.test}> Clicky</button>
                <Control key_id={this.state.key_id} secret_key={this.state.secret_key} ticker={this.state.ticker} idChange={this.idChange} skChange={this.skChange} tickerChange={this.tickerChange}/>
            </div>
        )
    }
}

export default Main;