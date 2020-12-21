import {Component} from "react";

class PCTBar extends Component{
    constructor(props){
        super(props);
        //pctChange
        //maxWidth
        //scale
        this.styling = this.styling.bind(this);
        this.bar = this.bar.bind(this);
        this.square = this.square.bind(this);
        this.subPlot = this.subPlot.bind(this);
        this.state = {
        }
    }

    bar(){
        return (<div style={{height: "5px", width: "68px", backgroundColor: "green", margin: "1px"}}></div>)
    }

    square(color){
        return (<div style={{height: "5px", width: "5px", backgroundColor: "yellow", margin: "1px"}}></div>)
    }

    subPlot(pctChange){
        let res = []
        for (let i = 0; i < pctChange; i += 0.1){
            res.push(this.bar())
        }

        for (let i = pctChange%0.1; i < pctChange; i += 0.01){
            res.push(this.square())
        }
        return res
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
                {this.subPlot(this.props.pctChange)}
                <div style={this.styling(this.props.pctChange)}></div>
            </div>
        )
        
    }
}

export default PCTBar;