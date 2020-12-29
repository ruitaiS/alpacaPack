import {Component} from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

class Chart extends Component{
    constructor(props){
        super(props);
        //data

        this.state = {
            //Default state initialization
        }
    }

    function(){
        console.log("Hi! :)")
    }

    render() {
        console.log(this.props.data.length)
        return (
        <LineChart
            width={750}
            height={450}
            data={this.props.data}
            margin={{
            top: 5, right: 30, left: 20, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={['dataMin', 'dataMax']} dataKey="t" />
            <YAxis type="number" domain={['auto', 'auto']} dataKey="p" />
            <Line type="monotone" dataKey="p" stroke="#82ca9d" />
        </LineChart>
        );
    }
}

export default Chart;