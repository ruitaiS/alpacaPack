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

    render(){
        return(
            <div>
                <div>{this.props.basePrice}</div>
                <div>{this.props.currPrice}</div>
            </div>
        )
        
    }
}

export default HealthBar;