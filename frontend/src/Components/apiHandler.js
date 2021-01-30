class API {
  constructor(key_id, secret_key, url) {
    this.key_id = key_id
    this.secret_key = secret_key
    this.url = url
  }


  //https://alpaca.markets/docs/api-documentation/api-v2/account/
  account(callback){
    let xhr = new XMLHttpRequest()
    xhr.addEventListener('load', ()=>callback(xhr.responseText))
    xhr.open('GET', `${this.url}/v2/account`)
    xhr.setRequestHeader("APCA-API-KEY-ID", this.key_id)
    xhr.setRequestHeader("APCA-API-SECRET-KEY", this.secret_key)
    xhr.send()
  }

  get_history(callback){
    let xhr = new XMLHttpRequest()
    xhr.addEventListener('load', ()=>callback(xhr.responseText))
    xhr.open('GET', `${this.url}/v2/account/portfolio/history`)
    xhr.setRequestHeader("APCA-API-KEY-ID", this.key_id)
    xhr.setRequestHeader("APCA-API-SECRET-KEY", this.secret_key)
    xhr.send()
  }

    //Order Related Documentation & Functions

    //Example of JSON order
    //https://alpaca.markets/docs/trading-on-alpaca/orders/

    //List of required parameters
    //https://alpaca.markets/docs/api-documentation/api-v2/orders/



  get_orders(callback){
      let xhr = new XMLHttpRequest()
      xhr.addEventListener('load', ()=>callback(xhr.responseText))
      xhr.open('GET', `${this.url}/v2/orders`)
      xhr.setRequestHeader("APCA-API-KEY-ID", this.key_id)
      xhr.setRequestHeader("APCA-API-SECRET-KEY", this.secret_key)
      xhr.send()
  }
    
  buy(callback, ticker, qty, type, time_in_force){      
    let xhr = new XMLHttpRequest()
    xhr.addEventListener('load', ()=>callback(xhr.responseText))
    xhr.open('POST', `${this.url}/v2/orders`)
    xhr.setRequestHeader("APCA-API-KEY-ID", this.key_id)
    xhr.setRequestHeader("APCA-API-SECRET-KEY", this.secret_key)

    let order = {
      "side" : "buy",
      "symbol": {ticker},
      "qty" : {qty},
      "type": {type},
      "time_in_force": {time_in_force}
    }

    xhr.send(JSON.stringify(order))
  }
  
  sell(callback, ticker, qty, type, time_in_force){
    let xhr = new XMLHttpRequest()
    xhr.addEventListener('load', ()=>callback(xhr.responseText))
    xhr.open('POST', `${this.url}/v2/orders`)
    xhr.setRequestHeader("APCA-API-KEY-ID", this.key_id)
    xhr.setRequestHeader("APCA-API-SECRET-KEY", this.secret_key)

    let order = {
      "side" : "sell",
      "symbol": {ticker},
      "qty" : {qty},
      "type": {type},
      "time_in_force": {time_in_force}
    }

    xhr.send(JSON.stringify(order))
  }

  //This cancels all orders - see second link above for ways to cancel specific orders
  cancel(callback){
    let xhr = new XMLHttpRequest()
    xhr.addEventListener('load', ()=>callback(xhr.responseText))
    xhr.open('DELETE', `${this.url}/v2/orders`)
    xhr.setRequestHeader("APCA-API-KEY-ID", this.key_id)
    xhr.setRequestHeader("APCA-API-SECRET-KEY", this.secret_key)
    xhr.send()
  }

  //Position Related Documentation & Functions
  //https://alpaca.markets/docs/api-documentation/api-v2/positions/
  //https://alpaca.markets/docs/api-documentation/api-v2/positions/#position-entity
  get_positions(callback){
    let xhr = new XMLHttpRequest()
    xhr.addEventListener('load', ()=>callback(xhr.responseText))
    xhr.open('GET', `${this.url}/v2/positions`)
    xhr.setRequestHeader("APCA-API-KEY-ID", this.key_id)
    xhr.setRequestHeader("APCA-API-SECRET-KEY", this.secret_key)
    xhr.send()
  }

  //Get Position for a single ticker symbol
  get_position(callback, ticker){
    let xhr = new XMLHttpRequest()
    xhr.addEventListener('load', ()=>callback(xhr.responseText))
    xhr.open('GET', `${this.url}/v2/positions/${ticker}`)
    xhr.setRequestHeader("APCA-API-KEY-ID", this.key_id)
    xhr.setRequestHeader("APCA-API-SECRET-KEY", this.secret_key)
    xhr.send()
  }

  //Functions for Updating Login Parameters
  //These may be depreciated, since now we just create a new instance of API on connect
  idChange(key_id){
    this.key_id = key_id
  }

  skChange(secret_key){
    this.secret_key = secret_key
  }

  urlChange(url){
    this.url = url
  }

}

export default API;