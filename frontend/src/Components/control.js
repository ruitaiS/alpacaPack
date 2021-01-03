import {Component} from "react";

//TODO: There are a lot of parameters being passed to control...
class Control extends Component{
    constructor(props) {
      //key_id
      //secret_key
      //ticker
      //idChange
      //skChange
      //tickerChange
      //streamChange

      super(props);
      this.state = {
        };
      this.currencyOptions = this.currencyOptions.bind(this)

      //TODO: More Comprehensive List
      //https://www.xe.com/symbols.php
      this.currencies = ["USD", "CAD", "JPY"]
    }

    currencyOptions(exclude){
      let res = []
      for (let currency of this.currencies){
        if (currency !== exclude){
          res.push(
            <option value={currency}>{currency}</option>
          )
        }
      }
      return res
    }
  
    render() {




      //Conditional Rendering for Stream Parameter Input
      let streamParams
      if (this.props.stream === 'stocks'){
        streamParams =               
        (<div>
        <label htmlFor="tck">Ticker:</label>
        <input style={{float:"right", width:"350px", textAlign:"center"}} id="tck" value={this.props.ticker} onChange={this.props.tickerChange}/>
        </div>)
      }else{
        //Placeholder
        //Will need conditional rendering of options from a list of currency pairs
        //Also it's using a pretty janky right 110px margin on the second select box to make it centered
        streamParams =(
        <div>
        <label htmlFor="pair">Pair:</label>
          <div id="pair" style={{float:"right", display: "flex", flexDirection: "row", justifyContent: "space-evenly", fontSize:"15px"}}>
          <select style={{width:"50px", textAlign:"center", margin:"0px 10px 0px 10px"}} value={this.props.p1} onChange={this.props.p1Change}>
                {this.currencyOptions(this.props.p2)}
          </select>
          to
          <select style={{width:"50px", textAlign:"center", margin:"0px 10px 0px 10px"}} value={this.props.p2} onChange={this.props.p2Change}>
                {this.currencyOptions(this.props.p1)}
          </select>
          <button style={{width:"50px", textAlign:"center", margin:"0px 50px 0px 10px"}} onClick={this.props.pairSwap}>Swap</button>
          </div>
        </div>
        )
      }

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
              {this.props.stream === "forex" ? 
                <input style={{float:"right", width:"350px", textAlign:"center"}} id="secret" disabled value="N/A"/>
                :
                <input style={{float:"right", width:"350px", textAlign:"center"}} id="secret" value={this.props.secret_key} onChange={this.props.skChange}/>
              }
              </div>
              

              <div>
              <label htmlFor="stream">Stream:</label>
              <select id="stream" style={{float:"right", width:"350px", textAlign:"center"}} value={this.props.stream} onChange={this.props.streamChange}>
              <option value="stocks">Stocks</option>
              <option value="forex">Forex</option>
              </select>
              </div>

              {streamParams}

              <button style={{float:"right", width:"350px", textAlign:"center"}} onClick={this.props.connect}>Connect</button>
          </fieldset>
        </div>
      );
    }
  }

export default Control;