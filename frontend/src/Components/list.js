import {Component} from "react";
import PositionBox from '../Components/positionBox';

class List extends Component{
    constructor(props){
        //positions
        //api

        super(props);

        this.history = this.history.bind(this)

        this.renderPosition = this.renderPosition.bind(this)
        this.state = {
            //Default state initialization
        }
    }

    renderPosition(symbol, qty, cost, price){
        return(<PositionBox symbol={symbol} qty={qty} cost={cost} price={price} api={this.props.api}/>)
    }

    //#region Test Functions
    //Test History
    history(){
        this.props.api.get_history((msg)=>console.log(msg))
    }

    sell(symbol, qty, price){

    }

    buy(symbol, qty, price){

    }

    render(){
        //alert(typeof(this.props.positions))
        let list = []
        let totalVal = 0

        //Only Render if Data has been instantiated
        if (this.props.positions != null){
            for (let symbol in this.props.positions){
                list.push(this.renderPosition(symbol, this.props.positions[symbol].qty, this.props.positions[symbol].cost, this.props.positions[symbol].price))
                totalVal += this.props.positions[symbol].price * this.props.positions[symbol].qty
            }
        }

        return (
            <div>
                Total Portfolio Value: ${(Math.floor(totalVal*100)/100).toFixed(2)}<br></br>
                Net Gain:
                {/**/}
                <button onClick={this.history}>Test Account History</button>
                {list}
            </div>
        )        
    }
}

export default List;