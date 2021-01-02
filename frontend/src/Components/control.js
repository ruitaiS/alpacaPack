import {Component} from "react";

class Control extends Component{
    constructor(props) {
      //key_id
      //secret_key
      //ticker
      //idChange
      //skChange
      //tickerChange

      super(props);
      this.state = {
        };
    }
  
    render() {
      return (
        <div className="centered">
          <fieldset className="inputBox">
              <legend>Control Panel:</legend>

              <div>
              <label htmlFor="key">Key ID:</label>
              <input style={{float:"right", width:"350px", textAlign:"center"}} id="key" value={this.props.key_id} onChange={this.props.idChange}/>
              </div>

              <div>
              <label htmlFor="secret">Secret Key:</label>
              <input style={{float:"right", width:"350px", textAlign:"center"}} id="secret" value={this.props.secret_key} onChange={this.props.skChange}/>
              </div>

              <div>
              <label for="stream">Stream:</label>
              <select id="stream" style={{float:"right", width:"350px", textAlign:"center"}}>
              <option value="Stocks">Stocks</option>
              <option value="Forex">Forex</option>
              </select>
              </div>

              <div>
              <label htmlFor="tck">Ticker:</label>
              <input style={{float:"right", width:"350px", textAlign:"center"}} id="tck" value={this.props.ticker} onChange={this.props.tickerChange}/>
              </div>

              <button style={{float:"right", width:"350px", textAlign:"center"}} onClick={this.props.connect}>Connect</button>
          </fieldset>
        </div>
      );
    }
  }

export default Control;