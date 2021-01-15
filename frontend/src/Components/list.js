import {Component} from "react";

class List extends Component{
    constructor(props){
        //positions

        super(props);

        this.renderPosition = this.renderPosition.bind(this)
        this.state = {
            //Default state initialization
        }
    }

    renderPosition(pos){
        return(
            <div>
                {pos.symbol}
            </div>
        )
    }

    render(){
        //alert(typeof(this.props.positions))
        let res = []
        let positions = []
        if (this.props.positions != null){
            positions = JSON.parse(this.props.positions)
        }
        //res.push(positions[0])

        for (let position of positions){
            res.push(this.renderPosition(position))
        }

        return (
            res
        )        
    }
}

export default List;