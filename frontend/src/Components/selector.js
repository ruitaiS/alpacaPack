import {Component} from "react";
import Stream from './stream';

class Selector extends Component{
    constructor(props) {
      super(props);
      this.tickerChange = this.tickerChange.bind(this);
      this.idChange = this.idChange.bind(this);
      this.skChange = this.skChange.bind(this);
      this.state = {
          key_id: 'PKHGR6CVRK7DTWFIB6Q1',
          secret_key: 'TpSauKJD8We5hu3vvXzwp2o7UrXBfR4uzxp4Z27n',
          ticker: 'TSLA',

        };
    }
  
    tickerChange(e) {
      this.setState({ticker: e.target.value});
    }
    idChange(e) {
        this.setState({key_id: e.target.value});
    }
    skChange(e) {
        this.setState({secret_key: e.target.value});
    }
  
    render() {
      return (
        <div class="centered">
        <fieldset class="inputBox">
            <legend>Input:</legend>

            <div>
            <label for="key">Key ID:</label>
            <input style={{float:"right", width:"350px", textAlign:"center"}} id="key" value={this.state.key_id} onChange={this.idChange}/>
            </div>

            <div>
            <label for="secret">Secret Key:</label>
            <input style={{float:"right", width:"350px", textAlign:"center"}} id="secret" value={this.state.secret_key} onChange={this.skChange}/>
            </div>

            <div>
            <label for="tck">Ticker:</label>
            <input style={{float:"right", width:"350px", textAlign:"center"}} id="tck" value={this.state.ticker} onChange={this.tickerChange}/>
            </div>
        </fieldset>
        <Stream ticker={this.state.ticker} key_id={this.state.key_id} secret_key={this.state.secret_key}/>
        </div>
      );
    }
  }

export default Selector;