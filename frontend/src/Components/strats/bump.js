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

//Similar inverse strategy should exist - sell as it's dipping, re-buy a larger amount of shares at a lower price



class BumpStrat extends Component{
    constructor(props){
        super(props);
        //Values that get passed to the component
        //api - alpaca trade api
        //ticker - symbol that we're trading on
        //value - current price of the asset
        

        //Functions that need to get bound to this instance
        this.deltaChange = this.deltaChange.bind(this);
        this.click = this.click.bind(this);
        this.state = {
            capital: 10000,
            delta: 0.01,

            status: "out", //out, in, waiting-entry, waiting-exit
        }
    }

    function(){
        console.log("Hi! :)")
    }

    deltaChange(e){
        this.setState({delta: e.target.value})
        console.log(`New Delta: ${this.state.delta}`)
    }

    capChange(e){
        this.setState({capital: e.target.value})
        console.log(`New Starting Allocation: ${this.state.capital}`)
        //Reset the statistics too
    }

    //This is kind of shitty because it will do it even when it's just the price data changing
    //Ideally you want to call a function in bump from the parent component
    componentDidUpdate(prevProps){
        if (prevProps.test !== this.props.test){
            console.log(`Test value changed from ${prevProps.test} to ${this.props.test}`)
        }
    }

    click(price){
        if (this.state.status === "out"){
            //Place a limit buy order
            //On completion, place limit sell @ delta
            let symbol = this.props.ticker
            let qty = Math.floor(this.state.capital / price)
            let type = "limit"
            let time_in_force = "gtc"
            this.props.api.buy(((msg)=>console.log(msg)), symbol, qty, type, price, time_in_force)
            
        }else if (this.state.status === "in"){
            //Place limit sell

        }else if (this.state.status === "waiting-entry"){
            //Cancel existing buy order

        }else if (this.state.status === "waiting-exit"){
            //Cancel sell order
            //

        }
    }

    render(){  



        return(
            <div>
                Bump Strat
                <fieldset className="inputBox">
                    <legend>{`Current Price: $${this.props.value}`}</legend>
                    <PCTBar pctChange="0.1" width="500" height="50"/>

                    <div>
                        <label htmlFor="slider">Capital Allocation: ${this.state.capital}</label>
                        {/*Conditionally disable if we're in a position */}
                        {this.state.status === "out" ? 
                            <input style={{float:"right", width:"150px", textAlign:"center"}} value={this.state.capital} onChange={this.capChange}/>
                            :
                            <input disabled style={{float:"right", width:"150px", textAlign:"center"}} value={this.state.capital} onChange={this.capChange}/>
                        }
                    </div>

                    <div>
                        <label htmlFor="slider">Delta: ${this.state.delta}</label>
                        <input style={{float:"right", width:"150px", textAlign:"center"}} type="range" min="0" max="10" step={0.01} value={this.state.delta} className="slider" id="slider" onChange={this.deltaChange}/>
                        <input style={{float:"right", width:"150px", textAlign:"center"}} value={this.state.delta} onChange={this.deltaChange}/>
                    </div>

                    <PriceBtn text={this.state.status} click={this.click} value={this.props.value}/>
                    
                </fieldset>
            </div>
        )
        
    }
}

export default BumpStrat;