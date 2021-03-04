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

        //positions
        

        //Functions that need to get bound to this instance
        this.deltaChange = this.deltaChange.bind(this);
        this.click = this.click.bind(this);
        this.apiConfirm = this.apiConfirm.bind(this);
        this.logOrders = this.logOrders.bind(this);

        this.test = this.test.bind(this);

        this.openOrders = {}
        this.state = {
            capital: 10000,
            delta: 0.01,

            openOrders: null,
            status: "out", //out, in, waiting-entry, waiting-exit

            
        }
    }

    test(){
        console.log(this.props.positions)
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

        //Not sure why, but this seems to only fire when an order is filled, partially filled, or cancelled
        //Eg. When an order is closed
        if (prevProps.positions !== this.props.positions){
            alert("Orders changed")
            console.log(`Positions changed from ${JSON.stringify(prevProps.positions)} to ${JSON.stringify(this.props.positions)}`)
        }

        //Check if any orders went from open to closed
    }

    logOrders(){
        //console.log(this.state.openOrders)
        if (this.state.openOrders === null){
            console.log(`No open orders for ${this.props.ticker}`)
        }
        else if (Object.keys(this.state.openOrders).length !== 0){
            console.log(`Currently Open Orders for ${this.props.ticker}: ${JSON.stringify(this.state.openOrders)}`)
        }
    }

    apiConfirm(msg){
        //API buy callback; stores the confirmation info
        //TODO: make sure it works for cancellations too

        //When cancelling, I think it gives an empty array if there are no orders to cancel

        //AFAIK, if it returns an empty message it means nothing happened, so whatever you tried to do didn't work
        //In these scenarios it returns false and exist
        //Otherwise it updates the openorders, 

        if (msg === "[]"){
            console.log("No message")
            return false
        }else{

            console.log(`Alpaca API Callback: ${msg}`)
            let data = JSON.parse(msg)
            if (!Array.isArray(data)){
                data = [data]
            }

            for (let datum of data){
                //Cancel response nests the info within the body, so we need to extract
                if(datum.body != null){
                    this.openOrders[datum.id]= {[datum.body.side]: datum.body.qty, price: datum.body.limit_price, status: datum.body.status}
                    console.log(`Order ${datum.id} : ${datum.body.side} ${datum.body.qty} shares of ${datum.body.symbol} for ${datum.body.limit_price}. Status: ${datum.body.status}`)                    
                }else{
                    this.openOrders[datum.id]= {[datum.side]: datum.qty, price: datum.limit_price, status: datum.status}
                    console.log(`Order ${datum.id} : ${datum.side} ${datum.qty} shares of ${datum.symbol} for ${datum.limit_price}. Status: ${datum.status}`)
                }
                this.setState({openOrders: this.openOrders})
            }

            //this.logOrders()

            return true
        }
    }

    click(price){

        //if waiting to complete an order, then clicking will cancel it
        //if not in a position, then it will place a buy
        //if in a position, then it will place a sell

        if (Object.keys(this.props.positions.orders).length !== 0){
            //TODO: Cancel by order ID, rather than cancel all
            //this.props.api.cancel((msg)=>this.apiConfirm(msg))

            //Mar 4
            //This isn't iterating:
            for (let id of this.props.positions["orders"]){
                alert(id)
            }

            //Rather than cancel, you could instead update the order to use the most recent price
            //We already have a seperate cancel button
        }else{
            //TODO: Check position size, rather than depend on state
            if (this.state.status === "out"){
                //Place a limit buy order
                //On completion, place limit sell @ delta
                let symbol = this.props.ticker
                let qty = Math.floor(this.state.capital / price)
                let type = "limit"
                let time_in_force = "gtc"
                this.props.api.buy((msg)=>this.apiConfirm(msg), symbol, qty, type, price, time_in_force)
                
            }else{
                //place a limit sell
                console.log(`pretend we're selling at ${price}`)
            }    
        }

        /*
        if (this.state.status === "out"){
            //Place a limit buy order
            //On completion, place limit sell @ delta
            let symbol = this.props.ticker
            let qty = Math.floor(this.state.capital / price)
            let type = "limit"
            let time_in_force = "gtc"
            this.props.api.buy((msg)=>this.apiConfirm(msg), symbol, qty, type, price, time_in_force)
            
        }else if (this.state.status === "in"){
            //Place limit sell

        }else if (this.state.status === "waiting-entry"){
            //Cancel existing buy order

        }else if (this.state.status === "waiting-exit"){
            //Cancel sell order
            //
        }*/
    }

    render(){
        let buttonText
        if (Object.keys(this.props.positions.orders).length !== 0){
            buttonText = "Cancel"
        }else{
            //Todo: format this
            buttonText = "Enter/Exit"
        }

        return(
            <div>
                Bump Strat
                <fieldset className="inputBox">
                    <legend>{`Current Price: $${this.props.value}`}</legend>
                    <PCTBar pctChange="0.1" width="500" height="50"/>

                    {Object.keys(this.props.positions.orders).length === 0 ?
                    "No Open Orders"
                    :
                    `Status: ${JSON.stringify(this.props.positions.orders)}`}

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

                    <PriceBtn text={buttonText} click={this.click} value={this.props.value}/>
                    <button onClick={this.logOrders}>Log Open Orders</button>
                    <button onClick={this.test}>Test Function</button>
                    <button onClick={()=>this.props.api.cancel((msg)=>this.apiConfirm(msg))}>Cancel All</button>
                    
                </fieldset>
            </div>
        )
        
    }
}

export default BumpStrat;