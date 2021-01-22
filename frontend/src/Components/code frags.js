//#region From Main.js
subscribe(ticker){
    this.ws.subscribe(ticker)
}

unsubscribe(ticker){
    this.ws.unsubscribe(ticker)
}

//Assumes you've already ws.subscribed to the ticker
get_price(ticker){
    alert("Checking Price for " + ticker)
    for (let datum of this.state.streamData){
        if (datum.sym === ticker){
            return datum.p
        }else{
            alert("Found Price for " + datum.sym)
        }
    }

    alert(ticker + " Price Not Found")
    return null
}



updatePositions(pos){
    this.setState({positions: pos})
    for (let position of JSON.parse(pos)){
        alert(position.symbol)
        this.subscribe(position.symbol)
    }
}
//#endregion

