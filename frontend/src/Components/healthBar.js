import {Component} from "react";

class HealthBar extends Component{
    constructor(props){
        super(props);
        //basePrice
        //currPrice
        //width
        //scale
        this.styling = this.styling.bind(this);
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
        let pctChange = (curr-base) / base
        let barWidth = this.props.maxWidth * Math.abs(pctChange) * this.props.scale
        console.log(`Percentage Change: ${pctChange}`)
        console.log(`Bar Width: ${barWidth}`)

        if (pctChange > 0){
            //Positive Change
            //return{transform: `translate(${this.props.maxWidth}px, 0px)`, height: "50px", width: `${barWidth}`, backgroundColor: "green"}
            return{transform: `translate(${this.props.maxWidth}px, 0px)`, height: "50px", width: `${barWidth}px`, backgroundColor: "green"}
        }else{
            //Negative Change
            //return{transform: `translate(${this.props.maxWidth - barWidth}px, 0px)`,height: "50px", width: `${barWidth}`, backgroundColor: "red"}
            return{transform: `translate(${this.props.maxWidth - barWidth}px, 0px)`, height: "50px", width: `${barWidth}px`, backgroundColor: "red"}
        }

        
        
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