import {Component} from "react";

class ComponentName extends Component{
    constructor(props){
        super(props);
        //Values that get passed to the component

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

export default ComponentName;