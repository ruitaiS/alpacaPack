import {Component} from "react";
import API from "./apiHandler";

class Test extends Component{
    constructor(props){
        super(props);
        //Values that get passed to the component

        //Functions that need to get bound to this instance
        this.function = this.function.bind(this);
        this.callback = this.callback.bind(this);
        this.state = {
            //Default state initialization
        }

        this.api = new API('PKHGR6CVRK7DTWFIB6Q1', 'TpSauKJD8We5hu3vvXzwp2o7UrXBfR4uzxp4Z27n', 'https://paper-api.alpaca.markets')
    }

    function(){
        console.log(this.api.account(this.callback))
        //this.callback("yo")
    }

    callback(response){
        this.setState({text: response})
    }

    render(){
        return(
            <div>
                {this.state.text}
                <button onClick={this.function}> Clicky</button>
            </div>
        )
        
    }
}

export default Test;