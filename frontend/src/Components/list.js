import {Component} from "react";

class List extends Component{
    constructor(props){
        //List of (Symbol, price) pairs?

        super(props);


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

export default List;