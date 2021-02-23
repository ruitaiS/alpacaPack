import {Component} from "react";
import PriceBtn from '../priceButton';
import PCTBar from '../pctBar';

//Buy in using the limit price button
    //Or at pre-set base price - executes so long as space key is held
//Automatically set limit sell based on predetermined pct / price change
    //One key liquidate panic button


class FlipStrat extends Component{
    constructor(props){
        super(props);
        //Values that get passed to the component
        //api - alpaca trade api
        //positions - master list of positions
        

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
                Flip Strat
                <PCTBar pctChange="0.1" width="500" height="50"/>

                {/*Conditional formatting to change the onclick */}
                <PriceBtn text="Test" click={()=>alert("clicked")}/>
            </div>
        )
        
    }
}

export default FlipStrat;