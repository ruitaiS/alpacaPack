import {Component} from "react";
import PriceBtn from '../priceButton';
import PCTBar from '../pctBar';

//Automatically place limit sell at buy price + delta

//Asset defined by user within parent class
//User defines delta
//User defines initial capital allocation

//Operation Loop:
//Not in a position
//User places buy at a certain price (using price hover button)
    //Use all available capital to purchase at that price
    //Shares = capital / price
    //Have traditional key-in and submit alternative (Optional)
//Waiting for buy order to fill (should be +/- instant?)
    //Scroll adjust order price after initial submission (Optional)
//Alpaca trade status confirms trade
    //Place limit order to liquidate
    //limit price = buy price + delta
//Waiting for sale to complete
//Alpaca trade status confirms sale
//Not in a position

//Considerations:
//Track session percent gains
    //Changing capital allocation should reset session gain tracking
    //Changing ticker symbol also resets it
//Only allow changing capital allocation / symbol while not in a position
//Changing the delta while still in a position should cancel the existing sell order and place a new one
//If delta is set to zero then 
//Price hover button should act as limit sell when in a position
//Secondary exit button without hover, places limit sell at price at time of click
//Panic button places market sell order



class BumpStrat extends Component{
    constructor(props){
        super(props);
        //Values that get passed to the component
        //api - alpaca trade api
        //symbol - symbol that we're trading on
        //price - current price of the asset
        

        //Functions that need to get bound to this instance
        //this.function = this.function.bind(this);
        this.state = {
            entered: "false",

        }
    }

    function(){
        console.log("Hi! :)")
    }

    render(){
        return(
            <div>
                Bump Strat
                {this.props.ticker}
                <PCTBar pctChange="0.1" width="500" height="50"/>

                {/*Conditional formatting to change the onclick */}
                <PriceBtn text="Test" click={()=>alert("clicked")}/>
            </div>
        )
        
    }
}

export default BumpStrat;