import {Component} from "react";

class List extends Component{
    constructor(props){
        //positions

        super(props);


        this.state = {
            //Default state initialization
        }
    }

    renderPosition(pos){
        <div>
            Position
        </div>
    }

    render(){

        return(
            <div>
                {this.props.positions}
            </div>
        )
        
    }
}

export default List;