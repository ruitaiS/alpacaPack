class API {
  constructor(key_id, secret_key, url) {
    this.key_id = key_id
    this.secret_key = secret_key
    this.url = url
  }
    //Example of JSON order
    //https://alpaca.markets/docs/trading-on-alpaca/orders/

    //List of required parameters
    //https://alpaca.markets/docs/api-documentation/api-v2/orders/

  account(callback){
    let xhr = new XMLHttpRequest()
    xhr.addEventListener('load', ()=>callback(xhr.responseText))
    xhr.open('GET', `${this.url}/v2/account`)
    xhr.setRequestHeader("APCA-API-KEY-ID", this.key_id)
    xhr.setRequestHeader("APCA-API-SECRET-KEY", this.secret_key)
    xhr.send()
  }

  get(callback){
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