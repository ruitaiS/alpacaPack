import React, { Component } from 'react'

class API extends Component {
  constructor(props) {
    super(props)
    this.account = this.account.bind(this)
    this.get = this.get.bind(this)
    this.buy = this.buy.bind(this)
    this.sell = this.sell.bind(this)
    this.cancel = this.cancel.bind(this)
    this.state = {
      liveURL: "https://api.alpaca.markets",
      paperURL: "https://paper-api.alpaca.markets",
      outputText: " ",
      responseText: " ",
  }


    //Props:
    //key_id
    //secret_key
    //ticker
    //qty
    //side
    //price
  }

  account(){
      
    let xhr = new XMLHttpRequest()

    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      console.log(xhr.responseText)
      this.setState({outputText: "Got Account Details"})
      this.setState({responseText: xhr.responseText})
    })

    xhr.open('GET', `${this.state.paperURL}/v2/account`)

    xhr.setRequestHeader("APCA-API-KEY-ID", this.props.key_id)
    xhr.setRequestHeader("APCA-API-SECRET-KEY", this.props.secret_key)

    xhr.send()

}

  get(){
      
      let xhr = new XMLHttpRequest()

      xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        console.log(xhr.responseText)
        this.setState({outputText: "Got Orders"})
        this.setState({responseText: xhr.responseText})
      })

      xhr.open('GET', `${this.state.paperURL}/v2/orders`)

      xhr.setRequestHeader("APCA-API-KEY-ID", this.props.key_id)
      xhr.setRequestHeader("APCA-API-SECRET-KEY", this.props.secret_key)

      xhr.send()

  }

  buy(){      
    let xhr = new XMLHttpRequest()

    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      console.log(xhr.responseText)
      this.setState({outputText: "Submitted Order"})
      this.setState({responseText: xhr.responseText})
    })

    xhr.open('POST', `${this.state.paperURL}/v2/orders`)

    xhr.setRequestHeader("APCA-API-KEY-ID", this.props.key_id)
    xhr.setRequestHeader("APCA-API-SECRET-KEY", this.props.secret_key)

    //Example of JSON order
    //https://alpaca.markets/docs/trading-on-alpaca/orders/

    //List of required parameters
    //https://alpaca.markets/docs/api-documentation/api-v2/orders/

    let order = {
      "side" : "buy",
      "symbol": "TSLA",
      "qty" : "1",
      "type": "market",
      "time_in_force": "gtc"
    }

    xhr.send(JSON.stringify(order))
}

  sell(){
    this.setState({outputText: "Sell Submitted"})
  }

  cancel(){

    //This Cancels all orders

    this.setState({outputText: "Cancelled"})

    let xhr = new XMLHttpRequest()

    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
    })

    xhr.open('DELETE', `${this.state.paperURL}/v2/orders`)

    xhr.setRequestHeader("APCA-API-KEY-ID", this.props.key_id)
    xhr.setRequestHeader("APCA-API-SECRET-KEY", this.props.secret_key)

    xhr.send()
  }


  render() {
    //Test API call functionality using buttons
    return (
      <div className="centered">
        {/*this.state.responseText*/}
        {this.state.outputText}
        <div className="row">
          <div><button className="bigBtn" onClick={this.account}>Account Details</button></div>
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