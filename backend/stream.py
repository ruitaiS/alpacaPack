

#Based on:
#https://www.youtube.com/watch?v=Mv6c_9FqNx4
#https://github.com/hackingthemarkets/alpaca-market-data-streaming-api

import websocket, json

key_id = 'PKHGR6CVRK7DTWFIB6Q1'
secret_key = 'TpSauKJD8We5hu3vvXzwp2o7UrXBfR4uzxp4Z27n'

def on_open(ws):
    print("opened")
    auth_data = {
        "action": "authenticate",
        "data": {"key_id": config.API_KEY, "secret_key": config.SECRET_KEY}
    }

    ws.send(json.dumps(auth_data))

    listen_message = {"action": "listen", "data": {"streams": ["AM.TSLA"]}}

    ws.send(json.dumps(listen_message))


def on_message(ws, message):
    print("received a message")
    print(message)

def on_close(ws):
    print("closed connection")

socket = "wss://data.alpaca.markets/stream"

ws = websocket.WebSocketApp(socket, on_open=on_open, on_message=on_message, on_close=on_close)
ws.run_forever()

#{"action": "authenticate","data": {"key_id": key_id, "secret_key": secret_key}}

'''
Terminal Example using Wscat:

wscat -c wss://data.alpaca.markets/stream
{"action": "authenticate","data": {"key_id": "PKHGR6CVRK7DTWFIB6Q1", "secret_key": "TpSauKJD8We5hu3vvXzwp2o7UrXBfR4uzxp4Z27n"}}

{"action": "listen", "data": {"streams": ["T.SPY"]}}


'''