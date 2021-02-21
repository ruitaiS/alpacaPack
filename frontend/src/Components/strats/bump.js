import {Component} from "react";

//Buy in using the limit price button
    //Or at pre-set base price - executes so long as space key is held
//Automatically set limit sell based on predetermined pct / price change
    //One key liquidate panic button


class BumbStrat extends Component{
    constructor(props){
        super(props);
        //Values that get passed to the component
        //

        //Functions that need to get bound to this instance
        //this.function = this.function.bind(this);
        this.state = {
            //Default state initialization
        }
    }

    function(){
        console.log("Hi! :)")
    }

    render(){
        return(
            <div>
                Stuff Goes Here
            </div>
        )
        
    }
}

export default BumbStrat;