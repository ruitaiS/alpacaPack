import {Component} from "react";

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

    renderPosition(pos){
        /*
        We want to pull these from Alpaca position:
        symbol
        qty

        Switch to calculating on the fly with the Polygon websocket data:
        current_price (price per share)
        market_value (total value of the position, for calculating % of portfolio value)
        change_today (percent change since yesterday)
        */

        return(
            <fieldset className="portfolioElement">
              <legend>{pos.symbol} // ${this.props.get_price(pos.symbol)} // {(pos.change_today*100).toFixed(2)}%</legend>

              <div>
              <label htmlFor="shares">Shares:</label>
              <input style={{float:"right", width:"50px", textAlign:"center"}} id="shares" value={pos.qty} /*onChange={this.props.idChange}*//>
              </div>

              <div>
                  <button onClick={()=>this.props.ws.subscribe(`${pos.symbol}`)}>Sub Test</button>
              </div>
              
            </fieldset>
        )
    }

    render(){
        //alert(typeof(this.props.positions))
        let res = []
        let positions = []
        
        //Only Render if Data has been instantiated
        if (this.props.positions != null && this.props.streamData != null){
            positions = JSON.parse(this.props.positions)
            
            //Data from WS comes in Asynchronously, so we update the position dict
            for (let datum of this.props.streamData){
                positions[datum.sym]["price"] = datum.p
            }
        }

        console.log(JSON.stringify(positions))
        
        

        /*
        for (let position of positions){
            res.push(this.renderPosition(position))
        }*/

        return (
            <div>
                yo
            </div>
        )        
    }
}

export default List;