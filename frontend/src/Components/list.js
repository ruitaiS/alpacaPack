import {Component} from "react";

class List extends Component{
    constructor(props){
        //positions

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
              <legend>{pos.symbol} // ${pos.current_price} // {(pos.change_today*100).toFixed(2)}%</legend>

              <div>
              <label htmlFor="shares">Shares:</label>
              <input style={{float:"right", width:"50px", textAlign:"center"}} id="shares" value={pos.qty} /*onChange={this.props.idChange}*//>
              </div>

              <div>
                  <button onClick={()=>this.props.ws.subscribe("MSFT")}>Sub Test</button>
              </div>
              
            </fieldset>
        )
    }

    render(){
        //alert(typeof(this.props.positions))
        let res = []
        let positions = []
        if (this.props.positions != null){
            positions = JSON.parse(this.props.positions)
        }
        //res.push(positions[0])

        for (let position of positions){
            res.push(this.renderPosition(position))
        }

        return (
            <div>
                {res}
            </div>
        )        
    }
}

export default List;