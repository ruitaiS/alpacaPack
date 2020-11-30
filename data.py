#Based on code from here:
#https://maxbodoia.com/building-a-financial-machine-learning-pipeline-with-alpaca-part-1/

import requests
import pandas_market_calendars as mcal
import time
import pickle

class Data:
    def __init__(self, key, secret_key): 
        self.key = key
        self.secret_key = secret_key

    #TODO: Rename get_date_bars and get_all bars
    #AFAIK, date_bars gets all the bars between the open and closing times specified for a single day
    #all_bars gets bars for each day in the date range specified
    def get_date_bars(self, ticker_symbol, open_timestamp, close_timestamp):

        #https://alpaca.markets/docs/api-documentation/api-v2/market-data/bars/

        # set the url for pulling bar data
        base_url = 'https://data.alpaca.markets/v1/bars/minute'

        # set the request headers using our api key/secret
        request_headers = {'APCA-API-KEY-ID': self.key, 'APCA-API-SECRET-KEY': self.secret_key}

        # set the request params for the next request
        request_params = {'symbols': ticker_symbol, 'limit': 1000, 'start': open_timestamp.isoformat(), 'end': close_timestamp.isoformat()}

        # get the response
        date_bars = requests.get(base_url, params=request_params, headers=request_headers).json()[ticker_symbol]

        # if the date on the response matches the closing date for the day, throw the candle away (since it technically happens after the close)
        if date_bars[-1]['t'] == int(close_timestamp.timestamp()):
            date_bars = date_bars[:-1]

        # return the bars for the date
        return date_bars

