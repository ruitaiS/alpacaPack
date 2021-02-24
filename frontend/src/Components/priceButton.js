import {Component} from "react";

//Generic button that takes a price stream, 

class PriceBtn extends Component{
    constructor(props){
        super(props);
        //text - The text displayed on the button
        //price - live price data that comes in
        //click - function that gets called when the button is clicked

        //Functions that need to get bound to this instance
        //this.function = this.function.bind(this);
        this.mouseOver = this.mouseOver.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
        this.click = this.click.bind(this);

        this.state = {
            //Default state initialization
        }
    }

    mouseOver(){
        console.log("MouseOver")
        this.setState({holdPrice: this.props.price})
        //alert(this.state.holdPrice)
    }

    mouseOut(){
        console.log("MouseOut")
        this.setState({holdPrice: null})
    }

    click(){
        this.props.click(this.state.holdPrice)
    }

    render(){
        return(
        <div>
            <button className="bigBtn" onClick={this.click} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>{this.props.text}: ${this.state.holdPrice != null ? this.state.holdPrice : this.props.price}</button>
        </div>
        )
        
    }
}

export default PriceBtn;