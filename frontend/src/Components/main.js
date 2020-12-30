import {Component} from "react";
import Control from './control';

class Main extends Component{
    constructor(props){
        super(props);
        //Values that get passed to the component

        this.tickerChange = this.tickerChange.bind(this);
        this.idChange = this.idChange.bind(this);
        this.skChange = this.skChange.bind(this);
        this.state = {
            key_id: 'PKHGR6CVRK7DTWFIB6Q1',
            secret_key: 'TpSauKJD8We5hu3vvXzwp2o7UrXBfR4uzxp4Z27n',
            ticker: 'TSLA',
        }
    }

    //#region Onchange functions
    //TODO: May need to update the websocket stream & also the api handler
    tickerChange(e) {
        this.setState({ticker: e.target.value});
    }
    idChange(e) {
        this.setState({key_id: e.target.value});
    }
    skChange(e) {
        this.setState({secret_key: e.target.value});
    }
    //#endregion

    render(){
        return(
            <div>
                {this.state.ticker}
                <Control key_id={this.state.key_id} secret_key={this.state.secret_key} ticker={this.state.ticker} idChange={this.idChange} skChange={this.skChange} tickerChange={this.tickerChange}/>
            </div>
        )
    }
}

export default Main;