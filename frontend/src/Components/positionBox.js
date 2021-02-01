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

        //Functions that need to get bound to this instance
        //this.function = this.function.bind(this);
        this.state = {
            lastQty: null, //Stores the previous sell quantity so you can re-buy the same amount

        }
    }

    function(){
        console.log("Hi! :)")
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
                  <button onClick={()=>alert(`Clicked ${this.props.symbol}`)}>Update</button>
              </div>
              
            </fieldset>
        )
        
    }
}

export default PositionBox;