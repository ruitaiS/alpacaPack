import {Component} from "react";

class PCTBar extends Component{
    constructor(props){
        super(props);
        //pctChange
        //maxWidth
        //scale
        this.styling = this.styling.bind(this);
        this.state = {
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
                <div style={this.styling(this.props.pctChange)}></div>
            </div>
        )
        
    }
}

export default PCTBar;