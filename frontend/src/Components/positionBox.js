import {Component} from "react";
import PCTBar from '../Components/pctBar';

class PositionBox extends Component{
    constructor(props){
        super(props);
        //symbol
        //qty
        //cost (purchase cost)
        //price (current price)
        //api (alpaca trade api)
        //updatePositions()

        //Functions that need to get bound to this instance
        this.enter = this.enter.bind(this);
        this.exit = this.exit.bind(this);


        this.state = {
            lastQty: null, //Stores the previous sell quantity so you can re-buy the same amount
        }
    }

    //Exit the position at the specified price level
    exit(price){
        //Do We really need the callback here?
        this.props.api.sell((msg)=>console.log(msg), this.props.symbol, this.props.qty, "limit", price, "gtc")
        this.setState({lastQty: this.props.qty})
    }

    //Re-enter the position at the specified price level
    enter(price){
        this.props.api.buy((msg)=>this.props.updatePositions(), this.props.symbol, this.state.lastQty, "limit", price, "gtc")
    }

    render(){
        let change = (this.props.price - this.props.cost) / this.props.cost

        return(
            <fieldset className="portfolioElement" key={this.props.symbol}>
              <legend>{this.props.symbol} // ${(Math.floor(this.props.price*100)/100).toFixed(2)} // {(change*100).toFixed(2)}%</legend>
              <PCTBar symbol={this.props.symbol} height="5" width="300" pctChange={change} />

              <div>
              <label htmlFor="shares">Shares:</label>
              <input style={{float:"right", width:"50px", textAlign:"center"}} id="shares" value={this.props.qty}/>
              </div>

              <div>
                  <button onClick={this.props.updatePositions}>Update</button>
              </div>


              {/*These will need conditional rendering depending on whether we're already in the position or not*/}
              <div>
                  <button onClick={()=>this.enter(10)}>Enter</button>
              </div>

              <div>
                  <button onClick={()=>this.exit(10)}>Exit</button>
              </div>
              
            </fieldset>
        )
        
    }
}

export default PositionBox;