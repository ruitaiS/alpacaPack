import {Component} from "react";

//Generic button that takes a price stream, 

class priceBtn extends Component{
    constructor(props){
        super(props);
        //text
        //value
        //onclick

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

export default priceBtn;