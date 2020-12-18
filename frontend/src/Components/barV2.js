import {Component} from "react";

class PCTBar extends Component{
    constructor(props){
        super(props);
        //pctChange
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

    bgColor(pctChange){
        if (pctChange < 0){
            return "red"
        }else{
            return "green"
        }
    }

    styling(pctChange){
        let barWidth = this.props.maxWidth * Math.abs(pctChange) * this.props.scale

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
                <div style={this.styling(this.props.basePrice, this.props.currPrice)}></div>
            </div>
        )
        
    }
}

export default PCTBar;