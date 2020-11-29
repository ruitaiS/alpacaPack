import alpaca_trade_api as tradeapi

key_id = 'PKHGR6CVRK7DTWFIB6Q1'
secret_key = 'TpSauKJD8We5hu3vvXzwp2o7UrXBfR4uzxp4Z27n'


api = tradeapi.REST(key_id, secret_key, base_url='https://paper-api.alpaca.markets') # or use ENV Vars shown below
account = api.get_account()
api.list_positions()
