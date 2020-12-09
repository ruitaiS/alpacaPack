import {Component} from "react";

class HealthBar extends Component{
    constructor(props){
        super(props);
        //basePrice
        //currPrice
        this.state = {
        }

        // //Bind this to its functions
        // this.click = this.click.bind(this)
        // this.mouseOver = this.mouseOver.bind(this)
        // this.mouseOut = this.mouseOut.bind(this)

        // let health = 100
        // let color = "green"
        // let healthBarText = buttonText - this.state.price

    }

    bgColor(percentChange){
        if (percentChange < 0){
            return "red"
        }else{
            return "green"
        }
    }

    styling(base, curr){
        let netChange = curr-base
        let pctChange = 100*netChange / base
        let width = pctChange + "%"

        if (netChange > 0){
            //Positive Change
            return{height: "50px", width: {netChange}, backgroundColor: "green"}
        }else{
            //Negative Change
            return{height: "50px", width: "10%", backgroundColor: "red"}
        }

        return {transform: "translate(-33%, 0%)", height: "50px", width: "300%", backgroundColor: this.bgColor(curr - base)}
    }

    render(){
        return(
            <div>
                <div>{this.props.basePrice}</div>
                <div>{this.props.currPrice}</div>
                <div style={this.styling(this.props.basePrice, this.props.currPrice)}></div>
                <div>Percentage Change: {100*(this.props.currPrice - this.props.basePrice)/this.props.basePrice} %</div>
            </div>
        )
        
    }
}

export default HealthBar;