import {Component} from "react";
import HealthBar from "./healthBar";
import Stream from './stream';

class Selector extends Component{
    constructor(props) {
      super(props);
      this.tickerChange = this.tickerChange.bind(this);
      this.idChange = this.idChange.bind(this);
      this.skChange = this.skChange.bind(this);
      this.baseChange = this.baseChange.bind(this);
      this.currChange = this.currChange.bind(this);
      this.sliderChange = this.sliderChange.bind(this);
      this.scaleChange = this.scaleChange.bind(this);
      this.UIscaleChange = this.UIscaleChange.bind(this);
      this.state = {
        key_id: 'PKHGR6CVRK7DTWFIB6Q1',
        secret_key: 'TpSauKJD8We5hu3vvXzwp2o7UrXBfR4uzxp4Z27n',
        ticker: 'TSLA',

        //Only for Testing Healthbar
        basePrice: 100,
        currPrice: 101,
        pct: 0,
        scale: 1,
        UIscale: 1,  

        };
    }
  
    tickerChange(e) {
      this.setState({ticker: e.target.value});
    }
    idChange(e) {
        this.setState({key_id: e.target.value});
    }
    skChange(e) {
        this.setState({secret_key: e.target.value});
    }

    baseChange(e) {
        this.setState({basePrice: e.target.value});
    }

    currChange(e) {
        this.setState({currPrice: e.target.value});
    }

    sliderChange(e){
      this.setState({pct: e.target.value, currPrice: this.state.basePrice + this.state.basePrice*(e.target.value / 100)})
    }

    scaleChange(e){
      this.setState({scale: e.target.value})
    }

    UIscaleChange(e){
      this.setState({UIscale: e.target.value})
    }
  
    render() {
      return (
        <div class="centered">
        <fieldset class="inputBox">
            <legend>Input:</legend>

            <div>
            <label for="key">Key ID:</label>
            <input style={{float:"right", width:"350px", textAlign:"center"}} id="key" value={this.state.key_id} onChange={this.idChange}/>
            </div>

            <div>
            <label for="secret">Secret Key:</label>
            <input style={{float:"right", width:"350px", textAlign:"center"}} id="secret" value={this.state.secret_key} onChange={this.skChange}/>
            </div>

            <div>
            <label for="tck">Ticker:</label>
            <input style={{float:"right", width:"350px", textAlign:"center"}} id="tck" value={this.state.ticker} onChange={this.tickerChange}/>
            </div>

            <div>
            <label for="base">Limit Price:</label>
            <input style={{float:"right", width:"350px", textAlign:"center"}} id="base" value={this.state.basePrice} onChange={this.baseChange}/>
            </div>

            <div>
            <label for="curr">Price:</label>
            <input style={{float:"right", width:"350px", textAlign:"center"}} id="curr" value={this.state.currPrice} onChange={this.currChange}/>
            </div>

            <div>
            <label for="curr">UI Scale:</label>
            <input style={{float:"right", width:"350px", textAlign:"center"}} id="UIscale" value={this.state.UIscale} onChange={this.UIscaleChange}/>
            </div>

            <div>
            <label for="curr">Scale:</label>
            <input style={{float:"right", width:"350px", textAlign:"center"}} id="scale" value={this.state.scale} onChange={this.scaleChange}/>
            </div>

            <div>
            <label for="slider">Percent Change: {this.state.pct}%</label>
            <input style={{float:"right", width:"350px", textAlign:"center"}} type="range" min={-100/this.state.scale} max={100/this.state.scale} step={1/this.state.scale} value={this.state.pct} class="slider" id="slider" onChange={this.sliderChange}/>
            </div>
        </fieldset>
        <HealthBar maxWidth="270" basePrice={this.state.basePrice} currPrice={this.state.currPrice} scale={this.state.UIscale}/>
        <Stream ticker={this.state.ticker} key_id={this.state.key_id} secret_key={this.state.secret_key}/>
        </div>
      );
    }
  }

export default Selector;