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
        this.capChange = this.capChange.bind(this);
        this.autoSellChange = this.autoSellChange.bind(this);
        this.limitChange = this.limitChange.bind(this);


        this.click = this.click.bind(this);
        this.apiConfirm = this.apiConfirm.bind(this);
        this.logOrders = this.logOrders.bind(this);

        this.openOrders = {}

        let startCapital
        if(this.props.positions.qty !== 0){
            startCapital = 0
        }else{
            startCapital = 10000
        }

        this.state = {
            //This assumes we start out *not* in a position
            //It will fuck up & double count if we already are in a position
            capital: startCapital,
            shares: this.props.positions.qty,

            autoSell: true,
            fracShares: false,
            limit: '',
            delta: 0.01,

            openOrders: {},
            status: "out", //out, in, waiting-entry, waiting-exit

            
        }
    }

    deltaChange(e){
        this.setState({delta: parseFloat(e.target.value)})
        console.log(`New Delta: ${this.state.delta}`)
    }

    limitChange(e){
        this.setState({limit: e.target.value})
        console.log(`New Limit: ${this.state.limit}`)
    }

    capChange(e){
        this.setState({capital: e.target.value})
        console.log(`New Starting Allocation: ${this.state.capital}`)
        //Reset the statistics too
    }

    autoSellChange(e){
        this.setState({autoSell: e.target.checked})
        console.log(`AutoSell set to ${e.target.checked}`)
    }

    //This is kind of shitty because it will do it even when it's just the price data changing
    //Ideally you want to call a function in bump from the parent component
    componentDidUpdate(prevProps){

        //Not sure why, but this seems to only fire when an order is filled, partially filled, or cancelled
        //Eg. When an order is closed
        if (prevProps.positions !== this.props.positions){
            //console.log("bump/componentDidUpdate: Orders changed")
            //console.log(`bump/componentDidUpdate: Positions changed from ${JSON.stringify(prevProps.positions)} to ${JSON.stringify(this.props.positions)}`)

            
            if(prevProps.positions.qty === 0 && this.props.positions.qty !== 0){
                console.log(`bump/componentDidUpdate: Bought ${this.props.positions.qty} shares at ${this.props.positions.entry_price} per share`)
                this.setState({capital: this.state.capital - (this.props.positions.qty * this.props.positions.entry_price)})
                this.setState({shares: this.props.positions.qty})

                //Place Sell Order Immediately If AutoSell enabled:
                if (this.state.autoSell){
                    let symbol = this.props.ticker
                    let qty = this.props.positions.qty
                    let type = "limit"
                    let price = this.props.positions.entry_price + this.state.delta
                    let time_in_force = "day"
                    console.log(`bump/componentDidUpdate: Placing AutoSell Order for ${qty} shares of ${symbol} at $${price} per share`)
                    this.props.api.sell((msg)=>this.apiConfirm(msg), symbol, qty, type, price, time_in_force)
                }

            }else if (prevProps.positions.qty !== 0 && this.props.positions.qty === 0){
                console.log(`bump/componentDidUpdate: Sold ${prevProps.positions.qty} shares at ${this.props.positions.exit_price} per share`)
                this.setState({capital: this.state.capital + (prevProps.positions.qty * this.props.positions.exit_price)})
                this.setState({shares: 0})
            }


            for (let id of Object.keys(this.openOrders)){
                if (this.props.positions.orders.id == null){
                    console.log(`bump/componentDidUpdate: Removing order ${id} from openOrders`)
                    delete this.openOrders[id]
                }
            }
            this.setState({openOrders: this.openOrders})
        }

        //Check if any orders went from open to closed
    }

    logOrders(){

        console.log(`bump/logOrders: ${JSON.stringify(this.state.openOrders)}`)
        if (this.state.openOrders == null){
            console.log(`bump/logOrders: No open orders for ${this.props.ticker}`)
        }
        else if (Object.keys(this.state.openOrders).length !== 0){
            console.log(`bump/logOrders: Currently Open Orders for ${this.props.ticker}: ${JSON.stringify(this.state.openOrders)}`)
        }
    }

    apiConfirm(msg){
        //API buy callback; stores the confirmation info
        //TODO: make sure it works for cancellations too

        //When cancelling, I think it gives an empty array if there are no orders to cancel

        //AFAIK, if it returns an empty message it means nothing happened, so whatever you tried to do didn't work
        //In these scenarios it returns false and exist
        //Otherwise it updates the openorders, 

        if (msg === "" || msg === "[]"){
            console.log("bump/apiConfirm: No message")
            return false
        }else{

            console.log(`bump/apiConfirm: Alpaca API Callback: ${msg}`)
            let data = JSON.parse(msg)
            if (!Array.isArray(data)){
                data = [data]
            }

            for (let datum of data){
                //Cancel response nests the info within the body, so we need to extract
                if(datum.body != null){
                    this.openOrders[datum.id]= {side: datum.body.side, qty: datum.body.qty, price: datum.body.limit_price, status: datum.body.status}
                    console.log(`bump/apiConfirm: Order ${datum.id} : ${datum.body.side} ${datum.body.qty} shares of ${datum.body.symbol} for ${datum.body.limit_price}. Status: ${datum.body.status}`)                    
                }else{
                    this.openOrders[datum.id]= {side: datum.side, qty: datum.qty, price: datum.limit_price, status: datum.status}
                    console.log(`bump/apiConfirm: Order ${datum.id} : ${datum.side} ${datum.qty} shares of ${datum.symbol} for ${datum.limit_price}. Status: ${datum.status}`)
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

        if (Object.keys(this.state.openOrders).length !== 0){
            for (let id of Object.keys(this.state.openOrders)){
                console.log(`bump/click: Cancelling order: ${id}`)
                this.props.api.cancelOrder(id, this.apiConfirm)
            }

            console.log(`bump/click: Open Orders: ${JSON.stringify(this.state.openOrders)}`)

            //Rather than cancel, you could instead update the order to use the most recent price
            //We already have a seperate cancel button
        }else{
            if (this.props.positions.qty === 0){
                //Place a limit buy order
                //On completion, place limit sell @ delta
                let symbol = this.props.ticker
                let qty = Math.floor(this.state.capital / price)
                let type = "limit"
                let time_in_force = "day"
                if(qty === 0){
                    alert("Not Enough Capital to Purchase any Shares")
                }else{
                    this.props.api.buy((msg)=>this.apiConfirm(msg), symbol, qty, type, price, time_in_force)
                }
                
            }else{
                //place a limit sell
                let symbol = this.props.ticker
                let qty = this.props.positions.qty
                let type = "limit"
                let time_in_force = "day"
                this.props.api.sell((msg)=>this.apiConfirm(msg), symbol, qty, type, price, time_in_force)
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
        
        //Mar 5: This text won't reset after exiting positions
        if (Object.keys(this.state.openOrders).length === 0){
            if(this.props.positions.qty === 0){
                buttonText = "Enter at"   
            }else{
                buttonText = "Exit at"
            }
            
        }else{
            //assumes we only have one order in openOrders
            buttonText = `Cancel ${this.openOrders[Object.keys(this.openOrders)[0]].side} at $${this.openOrders[Object.keys(this.openOrders)[0]].price}`
            
        }

        return(
            <div>
                Bump Strat
                <fieldset className="inputBox">
                    <legend>{`Current Price: $${this.props.value}`}</legend>
                    <PCTBar pctChange="0.1" width="500" height="50"/>
                    <div>
                        <label htmlFor="slider">Capital Allocation</label>
                        {/*Only enable if no pending orders and no shares held */}
                        {(Object.keys(this.state.openOrders).length === 0 && this.props.positions.qty === 0) ? 
                            <input style={{float:"right", width:"150px", textAlign:"center"}} value={this.state.capital} onChange={this.capChange}/>
                            :
                            <input disabled style={{float:"right", width:"150px", textAlign:"center"}} value={this.state.capital} onChange={this.capChange}/>
                        }
                    </div>

                    <div>
                    <label>Auto Sell:</label>
                        <input style={{float:"right", width:"150px", textAlign:"center"}} name="autoSell" type="checkbox" checked={this.state.autoSell} onChange={this.autoSellChange} />
                    </div>

                    <div>
                        <label htmlFor="slider">Delta: ${this.state.delta}</label>
                        <input style={{float:"right", width:"150px", textAlign:"center"}} type="range" min="0" max="10" step={0.01} value={this.state.delta} className="slider" id="slider" onChange={this.deltaChange}/>
                        <input style={{float:"right", width:"150px", textAlign:"center"}} value={this.state.delta} onChange={this.deltaChange}/>
                    </div>

                    Cash on Hand: ${this.state.capital}
                    <br></br>
                    Shares: {this.props.positions.qty}

                    <PriceBtn text={buttonText} click={this.click} value={this.props.value}/>
                    <button onClick={this.logOrders}>Log Open Orders</button>
                                        
                </fieldset>

                <fieldset className="inputBox">
                <legend>Manual Control</legend>
                    <input style={{float:"right", width:"150px", textAlign:"center"}} value={this.state.limit} onChange={this.limitChange}/>
                    <button onClick={()=>this.click(this.state.limit)}>{buttonText}: ${this.state.limit}</button>
                    <button onClick={()=>this.props.api.cancel((msg)=>this.apiConfirm(msg))}>Cancel All</button>

                </fieldset>
            </div>
        )
        
    }
}

export default BumpStrat;