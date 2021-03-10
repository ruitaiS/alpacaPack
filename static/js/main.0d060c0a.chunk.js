(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{16:function(t,e,s){},17:function(t,e,s){},18:function(t,e,s){"use strict";s.r(e);var i=s(0),n=s(4),a=s(10),o=s.n(a),r=(s(16),s(8)),c=s(7),l=s(2),p=s(3),h=s(1),u=s(6),d=s(5),b=function(t){Object(u.a)(s,t);var e=Object(d.a)(s);function s(t){var i;return Object(l.a)(this,s),(i=e.call(this,t)).state={},i.currencyOptions=i.currencyOptions.bind(Object(h.a)(i)),i.currencies=["USD","CAD","JPY"],i}return Object(p.a)(s,[{key:"currencyOptions",value:function(t){var e,s=[],n=Object(c.a)(this.currencies);try{for(n.s();!(e=n.n()).done;){var a=e.value;a!==t&&s.push(Object(i.jsx)("option",{value:a,children:a},a))}}catch(o){n.e(o)}finally{n.f()}return s}},{key:"render",value:function(){var t;return t="stocks"===this.props.stream?Object(i.jsxs)("div",{children:[Object(i.jsx)("label",{htmlFor:"tck",children:"Ticker:"}),this.props.connected?Object(i.jsx)("input",{disabled:!0,style:{float:"right",width:"350px",textAlign:"center"},id:"tck",value:this.props.ticker,onChange:this.props.tickerChange}):Object(i.jsx)("input",{style:{float:"right",width:"350px",textAlign:"center"},id:"tck",value:this.props.ticker,onChange:this.props.tickerChange})]}):Object(i.jsxs)("div",{children:[Object(i.jsx)("label",{htmlFor:"pair",children:"Pair:"}),Object(i.jsxs)("div",{id:"pair",style:{float:"right",display:"flex",flexDirection:"row",justifyContent:"space-evenly",fontSize:"15px"},children:[Object(i.jsx)("select",{style:{width:"50px",textAlign:"center",margin:"0px 10px 0px 10px"},value:this.props.p1,onChange:this.props.p1Change,children:this.currencyOptions(this.props.p2)}),"to",Object(i.jsx)("select",{style:{width:"50px",textAlign:"center",margin:"0px 10px 0px 10px"},value:this.props.p2,onChange:this.props.p2Change,children:this.currencyOptions(this.props.p1)}),Object(i.jsx)("button",{style:{width:"50px",textAlign:"center",margin:"0px 50px 0px 10px"},onClick:this.props.pairSwap,children:"Swap"})]})]}),Object(i.jsx)("div",{children:Object(i.jsxs)("fieldset",{className:"inputBox",children:[Object(i.jsx)("legend",{children:"Control Panel:"}),Object(i.jsxs)("div",{children:[Object(i.jsx)("label",{htmlFor:"key",children:"Key ID:"}),this.props.connected?Object(i.jsx)("input",{disabled:!0,style:{float:"right",width:"350px",textAlign:"center"},id:"key",value:this.props.key_id,onChange:this.props.idChange}):Object(i.jsx)("input",{style:{float:"right",width:"350px",textAlign:"center"},id:"key",value:this.props.key_id,onChange:this.props.idChange})]}),Object(i.jsxs)("div",{children:[Object(i.jsx)("label",{htmlFor:"secret",children:"Secret Key:"}),"forex"===this.props.stream||this.props.connected?Object(i.jsx)("input",{style:{float:"right",width:"350px",textAlign:"center"},id:"secret",disabled:!0,value:"N/A"}):Object(i.jsx)("input",{style:{float:"right",width:"350px",textAlign:"center"},id:"secret",value:this.props.secret_key,onChange:this.props.skChange})]}),Object(i.jsxs)("div",{children:[Object(i.jsx)("label",{htmlFor:"stream",children:"Stream:"}),Object(i.jsxs)("select",{disabled:!0,id:"stream",style:{float:"right",width:"350px",textAlign:"center"},value:this.props.stream,onChange:this.props.streamChange,children:[Object(i.jsx)("option",{value:"stocks",children:"Stocks"}),Object(i.jsx)("option",{value:"forex",children:"Forex"})]})]}),t,this.props.connected?Object(i.jsx)("button",{style:{float:"right",width:"350px",textAlign:"center"},onClick:this.props.disconnect,children:"Disconnect"}):Object(i.jsx)("button",{style:{float:"right",width:"350px",textAlign:"center"},onClick:this.props.connect,children:"Connect"})]})})}}]),s}(n.Component),y=function(){function t(e,s,i){Object(l.a)(this,t),this.key_id=e,this.secret_key=s,this.url=i}return Object(p.a)(t,[{key:"account",value:function(t){var e=new XMLHttpRequest;e.addEventListener("load",(function(){return t(e.responseText)})),e.open("GET","".concat(this.url,"/v2/account")),e.setRequestHeader("APCA-API-KEY-ID",this.key_id),e.setRequestHeader("APCA-API-SECRET-KEY",this.secret_key),e.send()}},{key:"get_history",value:function(t){var e=new XMLHttpRequest;e.addEventListener("load",(function(){return t(e.responseText)})),e.open("GET","".concat(this.url,"/v2/account/portfolio/history")),e.setRequestHeader("APCA-API-KEY-ID",this.key_id),e.setRequestHeader("APCA-API-SECRET-KEY",this.secret_key),e.send()}},{key:"get_orders",value:function(t){var e=new XMLHttpRequest;e.addEventListener("load",(function(){return t(e.responseText)})),e.open("GET","".concat(this.url,"/v2/orders")),e.setRequestHeader("APCA-API-KEY-ID",this.key_id),e.setRequestHeader("APCA-API-SECRET-KEY",this.secret_key),e.send()}},{key:"buy",value:function(t,e,s,i,n,a){var o=new XMLHttpRequest;o.addEventListener("load",(function(){return t(o.responseText)})),o.open("POST","".concat(this.url,"/v2/orders")),o.setRequestHeader("APCA-API-KEY-ID",this.key_id),o.setRequestHeader("APCA-API-SECRET-KEY",this.secret_key);var r={side:"buy",symbol:e,qty:s,type:i,limit_price:n,time_in_force:a,extended_hours:!0};o.send(JSON.stringify(r))}},{key:"sell",value:function(t,e,s,i,n,a){var o=new XMLHttpRequest;o.addEventListener("load",(function(){return t(o.responseText)})),o.open("POST","".concat(this.url,"/v2/orders")),o.setRequestHeader("APCA-API-KEY-ID",this.key_id),o.setRequestHeader("APCA-API-SECRET-KEY",this.secret_key);var r={side:"sell",symbol:e,qty:s,type:i,limit_price:n,time_in_force:a};o.send(JSON.stringify(r))}},{key:"cancel",value:function(t){var e=new XMLHttpRequest;e.addEventListener("load",(function(){return t(e.responseText)})),e.open("DELETE","".concat(this.url,"/v2/orders")),e.setRequestHeader("APCA-API-KEY-ID",this.key_id),e.setRequestHeader("APCA-API-SECRET-KEY",this.secret_key),e.send()}},{key:"cancelOrder",value:function(t,e){var s=new XMLHttpRequest;s.addEventListener("load",(function(){return e(s.responseText)})),s.open("DELETE","".concat(this.url,"/v2/orders/").concat(t)),s.setRequestHeader("APCA-API-KEY-ID",this.key_id),s.setRequestHeader("APCA-API-SECRET-KEY",this.secret_key),s.send()}},{key:"get_positions",value:function(t){var e=new XMLHttpRequest;e.addEventListener("load",(function(){return t(e.responseText)})),e.open("GET","".concat(this.url,"/v2/positions")),e.setRequestHeader("APCA-API-KEY-ID",this.key_id),e.setRequestHeader("APCA-API-SECRET-KEY",this.secret_key),e.send()}},{key:"get_position",value:function(t,e){var s=new XMLHttpRequest;s.addEventListener("load",(function(){return t(s.responseText)})),s.open("GET","".concat(this.url,"/v2/positions/").concat(e)),s.setRequestHeader("APCA-API-KEY-ID",this.key_id),s.setRequestHeader("APCA-API-SECRET-KEY",this.secret_key),s.send()}},{key:"idChange",value:function(t){this.key_id=t}},{key:"skChange",value:function(t){this.secret_key=t}},{key:"urlChange",value:function(t){this.url=t}}]),t}(),g=function(){function t(e,s,i,n,a,o,r){var c=this;Object(l.a)(this,t),this.finnhub=new WebSocket(i),this.alpaca=new WebSocket(n),this.finnhub.onopen=function(){console.log("stream/finnhub.onopen: Connected to FinnHub Price Stream"),r()},this.alpaca.onopen=function(){console.log("stream/alpaca.onopen: Authenticating Alpaca Trade Updates Stream"),c.alpaca.send(JSON.stringify({action:"authenticate",data:{key_id:e,secret_key:s}}))},this.finnhub.onmessage=function(t){a(t)},this.alpaca.onmessage=function(t){t.data.text().then((function(t){o(t)}))},this.finnhub.onclose=function(){console.log("stream/finnhub.onclose: Disconnected from Price Stream")},this.alpaca.onclose=function(){console.log("stream/alpaca.onclose: Disconnected from Trade Updates Stream")}}return Object(p.a)(t,[{key:"subscribe",value:function(t){console.log("stream/subscribe: Subscribing to ".concat(t)),this.finnhub.send(JSON.stringify({type:"subscribe",symbol:t}))}},{key:"unsubscribe",value:function(t){console.log("stream/unsubscribe: Unsubscribing from ".concat(t)),this.finnhub.send(JSON.stringify({type:"unsubscribe",symbol:t}))}},{key:"disconnect",value:function(){this.finnhub.close(),this.alpaca.close()}}]),t}(),f=function(t){Object(u.a)(s,t);var e=Object(d.a)(s);function s(t){var i;return Object(l.a)(this,s),(i=e.call(this,t)).mouseOver=i.mouseOver.bind(Object(h.a)(i)),i.mouseOut=i.mouseOut.bind(Object(h.a)(i)),i.click=i.click.bind(Object(h.a)(i)),i.state={},i}return Object(p.a)(s,[{key:"mouseOver",value:function(){console.log("MouseOver"),this.setState({holdPrice:this.props.value})}},{key:"mouseOut",value:function(){console.log("MouseOut"),this.setState({holdPrice:null})}},{key:"click",value:function(){this.props.click(this.state.holdPrice)}},{key:"render",value:function(){return Object(i.jsx)("div",{children:Object(i.jsxs)("button",{className:"bigBtn",onClick:this.click,onMouseOver:this.mouseOver,onMouseOut:this.mouseOut,children:[this.props.text,": $",null!=this.state.holdPrice?this.state.holdPrice:this.props.value]})})}}]),s}(n.Component),O=function(t){Object(u.a)(s,t);var e=Object(d.a)(s);function s(t){var i;return Object(l.a)(this,s),(i=e.call(this,t)).mainStyle=i.mainStyle.bind(Object(h.a)(i)),i.bar=i.bar.bind(Object(h.a)(i)),i.square=i.square.bind(Object(h.a)(i)),i.subPlot=i.subPlot.bind(Object(h.a)(i)),i.subStyle=i.subStyle.bind(Object(h.a)(i)),i.state={},i}return Object(p.a)(s,[{key:"bar",value:function(t,e){return Object(i.jsx)("div",{style:{height:"5px",width:"68px",backgroundColor:t,margin:"1px"}},e)}},{key:"square",value:function(t,e){return Object(i.jsx)("div",{style:{height:"5px",width:"5px",backgroundColor:t,margin:"1px"}},e)}},{key:"subPlot",value:function(t){var e=[];if(t>-.01&&t<.01||null==t)e.push(this.bar("white","".concat(this.props.symbol).concat(e.length)));else if(t>0){for(var s=0;s<=t-.1;s+=.1)e.push(this.bar("green","".concat(this.props.symbol).concat(e.length)));for(var i=0;i<=t%.1-.01;i+=.01)e.push(this.square("blue","".concat(this.props.symbol).concat(e.length)))}else{t=-t;for(var n=0;n<=t%.1-.01;n+=.01)e.push(this.square("blue","".concat(this.props.symbol).concat(e.length)));for(var a=0;a<=t-.1;a+=.1)e.push(this.bar("red","".concat(this.props.symbol).concat(e.length)))}return e}},{key:"subStyle",value:function(t){if(t<0){var e=7*Math.trunc(100*Math.abs(t));return{display:"flex",transform:"translate(".concat(this.props.width/2-e,"px, 0px)")}}return{display:"flex",transform:"translate(".concat(this.props.width/2,"px, 0px)")}}},{key:"mainStyle",value:function(t){t=t%.01*100;var e=this.props.width/2*Math.abs(t);return t>0?{transform:"translate(".concat(this.props.width/2,"px, 0px)"),height:"".concat(this.props.height,"px"),width:"".concat(e,"px"),backgroundColor:"green"}:{transform:"translate(".concat(this.props.width/2-e,"px, 0px)"),height:"".concat(this.props.height,"px"),width:"".concat(e,"px"),backgroundColor:"red"}}},{key:"render",value:function(){return Object(i.jsxs)("div",{children:[Object(i.jsx)("div",{style:this.subStyle(this.props.pctChange),children:this.subPlot(this.props.pctChange)}),Object(i.jsx)("div",{style:this.mainStyle(this.props.pctChange)})]})}}]),s}(n.Component),j=function(t){Object(u.a)(s,t);var e=Object(d.a)(s);function s(t){var i,n;return Object(l.a)(this,s),(i=e.call(this,t)).deltaChange=i.deltaChange.bind(Object(h.a)(i)),i.capChange=i.capChange.bind(Object(h.a)(i)),i.autoSellChange=i.autoSellChange.bind(Object(h.a)(i)),i.limitChange=i.limitChange.bind(Object(h.a)(i)),i.click=i.click.bind(Object(h.a)(i)),i.apiConfirm=i.apiConfirm.bind(Object(h.a)(i)),i.logOrders=i.logOrders.bind(Object(h.a)(i)),i.test=i.test.bind(Object(h.a)(i)),i.openOrders={},n=0!==i.props.positions.qty?0:1e4,i.state={capital:n,shares:i.props.positions.qty,autoSell:!0,fracShares:!1,limit:"",delta:.01,openOrders:{},status:"out"},i}return Object(p.a)(s,[{key:"test",value:function(){console.log(this.props.positions)}},{key:"deltaChange",value:function(t){this.setState({delta:parseFloat(t.target.value)}),console.log("New Delta: ".concat(this.state.delta))}},{key:"limitChange",value:function(t){this.setState({limit:t.target.value}),console.log("New Limit: ".concat(this.state.limit))}},{key:"capChange",value:function(t){this.setState({capital:t.target.value}),console.log("New Starting Allocation: ".concat(this.state.capital))}},{key:"autoSellChange",value:function(t){this.setState({autoSell:t.target.checked}),console.log("AutoSell set to ".concat(t.target.checked))}},{key:"componentDidUpdate",value:function(t){var e=this;if(t.positions!==this.props.positions){if(0===t.positions.qty&&0!==this.props.positions.qty){if(console.log("bump/componentDidUpdate: Bought ".concat(this.props.positions.qty," shares at ").concat(this.props.positions.entry_price," per share")),this.setState({capital:this.state.capital-this.props.positions.qty*this.props.positions.entry_price}),this.setState({shares:this.props.positions.qty}),this.state.autoSell){var s=this.props.ticker,i=this.props.positions.qty,n=this.props.positions.entry_price+this.state.delta;console.log("bump/componentDidUpdate: Placing AutoSell Order for ".concat(i," shares of ").concat(s," at $").concat(n," per share")),this.props.api.sell((function(t){return e.apiConfirm(t)}),s,i,"limit",n,"day")}}else 0!==t.positions.qty&&0===this.props.positions.qty&&(console.log("bump/componentDidUpdate: Sold ".concat(t.positions.qty," shares at ").concat(this.props.positions.exit_price," per share")),this.setState({capital:this.state.capital+t.positions.qty*this.props.positions.exit_price}),this.setState({shares:0}));for(var a=0,o=Object.keys(this.openOrders);a<o.length;a++){var r=o[a];null==this.props.positions.orders.id&&(console.log("bump/componentDidUpdate: Removing order ".concat(r," from openOrders")),delete this.openOrders[r])}this.setState({openOrders:this.openOrders})}}},{key:"logOrders",value:function(){console.log("bump/logOrders: ".concat(JSON.stringify(this.state.openOrders))),null==this.state.openOrders?console.log("bump/logOrders: No open orders for ".concat(this.props.ticker)):0!==Object.keys(this.state.openOrders).length&&console.log("bump/logOrders: Currently Open Orders for ".concat(this.props.ticker,": ").concat(JSON.stringify(this.state.openOrders)))}},{key:"apiConfirm",value:function(t){if(""===t||"[]"===t)return console.log("bump/apiConfirm: No message"),!1;console.log("bump/apiConfirm: Alpaca API Callback: ".concat(t));var e=JSON.parse(t);Array.isArray(e)||(e=[e]);var s,i=Object(c.a)(e);try{for(i.s();!(s=i.n()).done;){var n=s.value;null!=n.body?(this.openOrders[n.id]={side:n.body.side,qty:n.body.qty,price:n.body.limit_price,status:n.body.status},console.log("bump/apiConfirm: Order ".concat(n.id," : ").concat(n.body.side," ").concat(n.body.qty," shares of ").concat(n.body.symbol," for ").concat(n.body.limit_price,". Status: ").concat(n.body.status))):(this.openOrders[n.id]={side:n.side,qty:n.qty,price:n.limit_price,status:n.status},console.log("bump/apiConfirm: Order ".concat(n.id," : ").concat(n.side," ").concat(n.qty," shares of ").concat(n.symbol," for ").concat(n.limit_price,". Status: ").concat(n.status))),this.setState({openOrders:this.openOrders})}}catch(a){i.e(a)}finally{i.f()}return!0}},{key:"click",value:function(t){var e=this;if(0!==Object.keys(this.state.openOrders).length){for(var s=0,i=Object.keys(this.state.openOrders);s<i.length;s++){var n=i[s];console.log("bump/click: Cancelling order: ".concat(n)),this.props.api.cancelOrder(n,this.apiConfirm)}console.log("bump/click: Open Orders: ".concat(JSON.stringify(this.state.openOrders)))}else if(0===this.props.positions.qty){var a=this.props.ticker,o=Math.floor(this.state.capital/t);0===o?alert("Not Enough Capital to Purchase any Shares"):this.props.api.buy((function(t){return e.apiConfirm(t)}),a,o,"limit",t,"day")}else{var r=this.props.ticker,c=this.props.positions.qty;this.props.api.sell((function(t){return e.apiConfirm(t)}),r,c,"limit",t,"day")}}},{key:"render",value:function(){var t,e=this;return t=0===Object.keys(this.state.openOrders).length?0===this.props.positions.qty?"Enter at":"Exit at":"Cancel ".concat(this.openOrders[Object.keys(this.openOrders)[0]].side," at $").concat(this.openOrders[Object.keys(this.openOrders)[0]].price),Object(i.jsxs)("div",{children:["Bump Strat",Object(i.jsxs)("fieldset",{className:"inputBox",children:[Object(i.jsx)("legend",{children:"Current Price: $".concat(this.props.value)}),Object(i.jsx)(O,{pctChange:"0.1",width:"500",height:"50"}),"Cash on Hand: $",this.state.capital,Object(i.jsx)("br",{}),"Shares: ",this.props.positions.qty,Object(i.jsxs)("div",{children:[Object(i.jsx)("label",{htmlFor:"slider",children:"Capital Allocation"}),0===Object.keys(this.state.openOrders).length&&0===this.props.positions.qty?Object(i.jsx)("input",{style:{float:"right",width:"150px",textAlign:"center"},value:this.state.capital,onChange:this.capChange}):Object(i.jsx)("input",{disabled:!0,style:{float:"right",width:"150px",textAlign:"center"},value:this.state.capital,onChange:this.capChange})]}),Object(i.jsxs)("div",{children:[Object(i.jsx)("label",{children:"Auto Sell:"}),Object(i.jsx)("input",{style:{float:"right",width:"150px",textAlign:"center"},name:"autoSell",type:"checkbox",checked:this.state.autoSell,onChange:this.autoSellChange})]}),Object(i.jsxs)("div",{children:[Object(i.jsxs)("label",{htmlFor:"slider",children:["Delta: $",this.state.delta]}),Object(i.jsx)("input",{style:{float:"right",width:"150px",textAlign:"center"},type:"range",min:"0",max:"10",step:.01,value:this.state.delta,className:"slider",id:"slider",onChange:this.deltaChange}),Object(i.jsx)("input",{style:{float:"right",width:"150px",textAlign:"center"},value:this.state.delta,onChange:this.deltaChange})]}),Object(i.jsx)(f,{text:t,click:this.click,value:this.props.value}),Object(i.jsx)("button",{onClick:this.logOrders,children:"Log Open Orders"}),Object(i.jsx)("button",{onClick:this.test,children:"Test Function"}),Object(i.jsx)("button",{onClick:function(){return e.props.api.cancel((function(t){return e.apiConfirm(t)}))},children:"Cancel All"})]}),Object(i.jsxs)("fieldset",{className:"inputBox",children:[Object(i.jsx)("legend",{children:"Manual Control"}),Object(i.jsx)("input",{style:{float:"right",width:"150px",textAlign:"center"},value:this.state.limit,onChange:this.limitChange}),Object(i.jsxs)("button",{onClick:function(){return e.click(e.state.limit)},children:[t,": $",this.state.limit]})]})]})}}]),s}(n.Component),v=function(t){Object(u.a)(s,t);var e=Object(d.a)(s);function s(t){var i;return Object(l.a)(this,s),(i=e.call(this,t)).tickerChange=i.tickerChange.bind(Object(h.a)(i)),i.idChange=i.idChange.bind(Object(h.a)(i)),i.skChange=i.skChange.bind(Object(h.a)(i)),i.streamChange=i.streamChange.bind(Object(h.a)(i)),i.p1Change=i.p1Change.bind(Object(h.a)(i)),i.p2Change=i.p2Change.bind(Object(h.a)(i)),i.pairSwap=i.pairSwap.bind(Object(h.a)(i)),i.priceListener=i.priceListener.bind(Object(h.a)(i)),i.tradeStatusListener=i.tradeStatusListener.bind(Object(h.a)(i)),i.apiPositionListener=i.apiPositionListener.bind(Object(h.a)(i)),i.connect=i.connect.bind(Object(h.a)(i)),i.disconnect=i.disconnect.bind(Object(h.a)(i)),i.updatePositions=i.updatePositions.bind(Object(h.a)(i)),i.fhConnect=i.fhConnect.bind(Object(h.a)(i)),i.testClick=i.testClick.bind(Object(h.a)(i)),i.logPos=i.logPos.bind(Object(h.a)(i)),i.clearOrders=i.clearOrders.bind(Object(h.a)(i)),i.positions={},i.state={key_id:"PKW3I9RKUMW268FBKY4H",secret_key:"Bvctrlb0EdjfBiX12zWNoS0mwG9qd33V2kgRNusJ",positions:null,streamData:null,stream:"stocks",ticker:"XPEV",p1:"USD",p2:"CAD",connected:!1,test:!0},i}return Object(p.a)(s,[{key:"tickerChange",value:function(t){this.setState({ticker:t.target.value})}},{key:"idChange",value:function(t){this.setState({key_id:t.target.value})}},{key:"skChange",value:function(t){this.setState({secret_key:t.target.value})}},{key:"streamChange",value:function(t){this.setState({stream:t.target.value})}},{key:"p1Change",value:function(t){this.setState({p1:t.target.value})}},{key:"p2Change",value:function(t){this.setState({p2:t.target.value})}},{key:"pairSwap",value:function(){var t=this.state.p1,e=this.state.p2;this.setState({p1:e}),this.setState({p2:t})}},{key:"priceListener",value:function(t){var e=JSON.parse(t.data);if("trade"===e.type){var s,i=Object(c.a)(e.data);try{for(i.s();!(s=i.n()).done;){var n=s.value;this.positions[n.s].value=n.p}}catch(a){i.e(a)}finally{i.f()}}this.setState({positions:this.positions})}},{key:"tradeStatusListener",value:function(t){var e=JSON.parse(t).data;if(null!=e.status)console.log("main/tradeStatusListener: Alpaca says ".concat(e.status)),"authorized"===e.status&&this.ws.alpaca.send(JSON.stringify({action:"listen",data:{streams:["trade_updates"]}}));else if(null!=e.streams)e.streams.forEach((function(t){console.log("main/tradeStatusListener: Alpaca is listening to ".concat(t))}));else{var s;if("new"===e.event)console.log("main/tradeStatusListener: New order created to ".concat(e.order.side," at ").concat(e.order.limit_price," per share, for ").concat(e.order.qty," shares")),this.positions[e.order.symbol].orders[e.order.id]=(s={},Object(r.a)(s,e.order.side,e.order.qty),Object(r.a)(s,"price",e.order.limit_price),Object(r.a)(s,"status","open"),s);else"fill"===e.event?(console.log("main/tradeStatusListener: ".concat(e.order.filled_qty," orders filled at ").concat(e.order.filled_avg_price)),"sell"===e.order.side&&this.positions[e.order.symbol].qty<=e.order.filled_qty&&(this.positions[e.order.symbol]={qty:0,entry_price:null,exit_price:parseFloat(e.order.filled_avg_price),value:null,orders:{}}),this.updatePositions()):"partial_fill"===e.event?(console.log("main/tradeStatusListener: Partial Order Fill"),this.updatePositions(),console.log("main/tradeStatusListener: ".concat(e.order.filled_qty," orders filled at ").concat(e.order.filled_avg_price))):"canceled"===e.event?(console.log("main/tradeStatusListener: Order ".concat(e.order.id," was canceled")),this.positions[e.order.symbol]={qty:0,entry_price:null,exit_price:null,value:null,orders:{}},this.updatePositions()):console.log("main/tradeStatusListener: ".concat(e.event))}}},{key:"apiPositionListener",value:function(t){var e,s=Object(c.a)(JSON.parse(t));try{for(s.s();!(e=s.n()).done;){var i=e.value;null==this.positions[i.symbol]&&this.ws.subscribe(i.symbol),this.positions[i.symbol]={qty:i.qty,entry_price:parseFloat(i.avg_entry_price),exit_price:null,value:i.lastday_price,orders:{}}}}catch(n){s.e(n)}finally{s.f()}this.setState({positions:this.positions})}},{key:"updatePositions",value:function(){this.api.get_positions(this.apiPositionListener)}},{key:"fhConnect",value:function(){this.ws.subscribe(this.state.ticker),this.updatePositions(),this.setState({connected:!0})}},{key:"connect",value:function(){"stocks"===this.state.stream?(this.positions["".concat(this.state.ticker)]={qty:0,entry_price:null,exit_price:null,value:null,orders:{}},this.api=new y(this.state.key_id,this.state.secret_key,"https://paper-api.alpaca.markets"),this.ws=new g(this.state.key_id,this.state.secret_key,"wss://ws.finnhub.io?token=c0ui7on48v6r6g576j60","wss://paper-api.alpaca.markets/stream",this.priceListener,this.tradeStatusListener,this.fhConnect),this.api.get_orders((function(t){return console.log("main/connect: Existing Orders: ".concat(t))}))):(alert("Forex support coming soon!"),this.setState({stream:"stocks"}))}},{key:"disconnect",value:function(){for(var t in this.positions)this.ws.unsubscribe(t);this.ws.disconnect(),this.setState({positions:null}),this.setState({connected:!1})}},{key:"testClick",value:function(){this.state.test?(this.setState({test:!1}),console.log("Set to false")):(this.setState({test:!0}),console.log("Set to true"))}},{key:"logPos",value:function(){this.updatePositions(),console.log(JSON.stringify(this.state.positions))}},{key:"clearOrders",value:function(t,e){null==e?this.positions[t].orders=null:delete this.positions[t].orders[e]}},{key:"render",value:function(){return Object(i.jsx)("div",{children:Object(i.jsxs)("div",{className:"centered",children:[Object(i.jsx)(b,{key_id:this.state.key_id,secret_key:this.state.secret_key,ticker:this.state.ticker,stream:this.state.stream,p1:this.state.p1,p2:this.state.p2,idChange:this.idChange,skChange:this.skChange,tickerChange:this.tickerChange,streamChange:this.streamChange,p1Change:this.p1Change,p2Change:this.p2Change,pairSwap:this.pairSwap,connect:this.connect,disconnect:this.disconnect,connected:this.state.connected}),null!=this.state.positions&&Object(i.jsx)(j,{test:this.state.test,api:this.api,ticker:this.state.ticker,value:this.state.positions[this.state.ticker].value,positions:this.state.positions[this.state.ticker]}),Object(i.jsxs)("div",{className:"centeredRow",children:[Object(i.jsx)("button",{onClick:this.testClick,children:"Test"}),Object(i.jsx)("button",{onClick:this.logPos,children:"Log Positions"})]})]})})}}]),s}(n.Component);s(17);var k=function(){return Object(i.jsx)(v,{})},m=function(t){t&&t instanceof Function&&s.e(3).then(s.bind(null,19)).then((function(e){var s=e.getCLS,i=e.getFID,n=e.getFCP,a=e.getLCP,o=e.getTTFB;s(t),i(t),n(t),a(t),o(t)}))};o.a.render(Object(i.jsx)(k,{}),document.getElementById("root")),m()}},[[18,1,2]]]);
//# sourceMappingURL=main.0d060c0a.chunk.js.map