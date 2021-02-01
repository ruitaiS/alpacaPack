import {Component} from "react";

class PCTBar extends Component{
    constructor(props){
        super(props);
        //pctChange
        //width
        //height
        this.mainStyle = this.mainStyle.bind(this);
        this.bar = this.bar.bind(this);
        this.square = this.square.bind(this);
        this.subPlot = this.subPlot.bind(this);
        this.subStyle = this.subStyle.bind(this);
        this.state = {
        }
    }

    bar(color, key){
        return (<div key={key} style={{height: "5px", width: "68px", backgroundColor: color, margin: "1px"}}></div>)
    }

    square(color, key){
        return (<div key={key} style={{height: "5px", width: "5px", backgroundColor: color, margin: "1px"}}></div>)
    }

    subPlot(pct){
        let res = []

        if (((pct > -0.01)&&(pct < 0.01))||(pct == null)){
            //Placeholder blank bar, otherwise it shifts up b/c missing element
            res.push(this.bar("white", `${this.props.symbol}${res.length}`))
        }else{
            //NOTE: This is still a little bit buggy when converting squares into bars
            if (pct > 0){
                for (let i = 0; i <= pct - 0.1; i += 0.1){
                    res.push(this.bar("green", `${this.props.symbol}${res.length}`))
                }
        
                for (let j = 0; j <= pct%0.1-0.01; j += 0.01){
                    res.push(this.square("blue", `${this.props.symbol}${res.length}`))
                }
            }else{
                pct = -pct
                for (let j = 0; j <= pct%0.1-0.01; j += 0.01){
                    res.push(this.square("blue", `${this.props.symbol}${res.length}`))
                }

                for (let i = 0; i <= pct - 0.1; i += 0.1){
                    res.push(this.bar("red", `${this.props.symbol}${res.length}`))
                }
            }            
        }
        return res
    }

    //Styling for the subplot
    subStyle(pct){
        if (pct < 0){
            let barWidth = (Math.trunc(Math.abs(pct)*100))*7
            return {display:"flex", transform: `translate(${(this.props.width/2)-barWidth}px, 0px)`}
        }else{
            return {display:"flex", transform: `translate(${(this.props.width/2)}px, 0px)`}
        }
    }

    //Styling for the Main Bar
    mainStyle(pct){
        //Main Bar Represents Single Percentage
        pct = (pct%0.01)*100

        let barWidth = (this.props.width/2) * Math.abs(pct)
        if (pct > 0){
            //Positive Change
            //return{transform: `translate(${(this.props.width/2)}px, 0px)`, height: "50px", width: `${barWidth}`, backgroundColor: "green"}
            return{transform: `translate(${(this.props.width/2)}px, 0px)`, height: `${this.props.height}px`, width: `${barWidth}px`, backgroundColor: "green"}
        }else{
            //Negative Change
            //return{transform: `translate(${(this.props.width/2) - barWidth}px, 0px)`,height: "50px", width: `${barWidth}`, backgroundColor: "red"}
            return{transform: `translate(${(this.props.width/2) - barWidth}px, 0px)`, height: `${this.props.height}px`, width: `${barWidth}px`, backgroundColor: "red"}
        }
    }

    render(){
        //NOTE: Setting the width of the encapsulating div has strange effects on centering
        return(
            <div>
                <div style={this.subStyle(this.props.pctChange)}>{this.subPlot(this.props.pctChange)}</div>
                <div style={this.mainStyle(this.props.pctChange)}></div>
            </div>
        )
        
    }
}

export default PCTBar;