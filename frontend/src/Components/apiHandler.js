import React, { Component } from 'react'

class API extends Component {
  constructor(props) {
    super(props)
    this.buy = this.buy.bind(this)
    this.sell = this.sell.bind(this)
    this.cancel = this.cancel.bind(this)
    this.state = {
      outputText: "",
      serverText: "",  
  }

    //Props:
    //key_id
    //secret_key
    //ticker
    //side
    //quantity
    //price
  }
  componentDidMount() {
    this.getData()
  }

  getData() {
    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest()

    // get a callback when the server responds
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      console.log(xhr.responseText)
    })
    // open the request with the verb and the url
    xhr.open('GET', 'https://dog.ceo/api/breeds/list/all')
    // send the request
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
          <div><button className="bigBtn" onClick={this.buy}>Buy</button></div>
          <div><button className="bigBtn" onClick={this.sell}>Sell</button></div>
          <div><button className="bigBtn" onClick={this.cancel}>Cancel</button></div>
        </div>
      </div>
    )
  }
}

export default API;