import React, { Component } from 'react'

class API extends Component {
  constructor(props) {
    super(props)
    this.get = this.get.bind(this)
    this.buy = this.buy.bind(this)
    this.sell = this.sell.bind(this)
    this.cancel = this.cancel.bind(this)
    this.state = {
      liveURL: "https://api.alpaca.markets",
      paperURL: "https://paper-api.alpaca.markets",
      outputText: " ",
      serverText: " ",  
  }

    //Props:
    //key_id
    //secret_key
    //ticker
    //side
    //quantity
    //price
  }

  get(){
      
      let xhr = new XMLHttpRequest()

      xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        console.log(xhr.responseText)
        this.setState({outputText: "Got Orders"})
        this.setState({responseText: xhr.responseText})
      })

      xhr.open('GET', `${this.state.paperURL}/v2/account`)

      xhr.setRequestHeader("APCA-API-KEY-ID", this.props.key_id)
      xhr.setRequestHeader("APCA-API-SECRET-KEY", this.props.secret_key)

      xhr.send()

  }

  buy(){
      
    let xhr = new XMLHttpRequest()

    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      console.log(xhr.responseText)
    })

    xhr.open('GET', 'https://dog.ceo/api/breeds/list/all')

    this.setState({outputText: "Buy Submitted"})

    xhr.send()

}

  sell(){
    this.setState({outputText: "Sell Submitted"})
  }

  cancel(){
    this.setState({outputText: "Cancelled"})
  }


  render() {
    //Test API call functionality using buttons
    return (
      <div className="centered">
        {this.state.serverText}
        {this.state.outputText}
        <div className="row">
        <div><button className="bigBtn" onClick={this.get}>Get</button></div>
          <div><button className="bigBtn" onClick={this.buy}>Buy</button></div>
          <div><button className="bigBtn" onClick={this.sell}>Sell</button></div>
          <div><button className="bigBtn" onClick={this.cancel}>Cancel</button></div>
        </div>
      </div>
    )
  }
}

export default API;