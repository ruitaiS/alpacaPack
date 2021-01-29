import {Component} from "react";
import PCTBar from '../Components/pctBar';

class List extends Component{
    constructor(props){
        //positions
        //streamData

        super(props);

        this.renderPosition = this.renderPosition.bind(this)
        this.state = {
            //Default state initialization
        }
    }

    renderPosition(symbol, qty, cost, price){
        /*
        We want to pull these from Alpaca position:
        symbol
        qty

        Switch to calculating on the fly with the Polygon websocket data:
        current_price (price per share)
        market_value (total value of the position, for calculating % of portfolio value)
        change_today (percent change since yesterday)
        */

        let change = (price - cost) / cost

        return(
            <fieldset className="portfolioElement">
              <legend>{symbol} // ${(Math.floor(price*100)/100).toFixed(2)} // {(change*100).toFixed(2)}%</legend>
              <PCTBar height="5" width="300" pctChange={change} />

              <div>
              <label htmlFor="shares">Shares:</label>
              <input style={{float:"right", width:"50px", textAlign:"center"}} id="shares" value={qty}/>
              </div>

              <div>
                  <button onClick={()=>alert(`Clicked ${symbol}`)}>Update</button>
              </div>
              
            </fieldset>
        )
    }

    render(){
        //alert(typeof(this.props.positions))
        let res = []
        let positions = []
        
        //Only Render if Data has been instantiated
        if (this.props.positions != null){
            for (let symbol in this.props.positions){
                res.push(this.renderPosition(symbol, this.props.positions[symbol].qty, this.props.positions[symbol].cost, this.props.positions[symbol].price))
            }
        }

        return (
            <div>
                {res}
            </div>
        )        
    }
}

export default List;