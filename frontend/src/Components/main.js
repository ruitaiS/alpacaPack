import {Component} from "react";
import Control from './control';
import API from './apiHandler';

class Main extends Component{
    constructor(props){
        super(props);
        //Values that get passed to the component

        this.tickerChange = this.tickerChange.bind(this);
        this.idChange = this.idChange.bind(this);
        this.skChange = this.skChange.bind(this);

        this.log = this.log.bind(this);
        this.state = {
            key_id: 'PKHGR6CVRK7DTWFIB6Q1',
            secret_key: 'TpSauKJD8We5hu3vvXzwp2o7UrXBfR4uzxp4Z27n',
            ticker: 'TSLA',
        }

        this.api = new API(this.state.key_id, this.state.secret_key, 'https://paper-api.alpaca.markets')
    }

    //#region Onchange functions
    //TODO: May need to update the websocket stream & also the api handler
    tickerChange(e) {
        this.setState({ticker: e.target.value});
    }
    idChange(e) {
        this.setState({key_id: e.target.value});
        this.api = new API(this.state.key_id, this.state.secret_key, 'https://paper-api.alpaca.markets')
    }
    skChange(e) {
        this.setState({secret_key: e.target.value});
        this.api = new API(this.state.key_id, this.state.secret_key, 'https://paper-api.alpaca.markets')
    }
    //#endregion

    log(msg){
        console.log(msg)
    }


    render(){
        return(
            <div>
                {this.state.key_id}
                <button onClick={() => this.api.account(this.log)}> Clicky</button>
                <Control key_id={this.state.key_id} secret_key={this.state.secret_key} ticker={this.state.ticker} idChange={this.idChange} skChange={this.skChange} tickerChange={this.tickerChange}/>
            </div>
        )
    }
}

export default Main;