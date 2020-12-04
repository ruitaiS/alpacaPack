#Based on code from here:
#https://maxbodoia.com/building-a-financial-machine-learning-pipeline-with-alpaca-part-1/

import requests
import pandas_market_calendars as mcal
import pandas as pd
import time
from datetime import datetime, date, timedelta
import json
import os

#TODO: There's like four different things dealing with time lol

class Data:
    def __init__(self, key, secret_key): 
        self.key = key
        self.secret_key = secret_key

        #TODO: Sequentially load previously pickled historical datapoints

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

    def get_all_bars(self, ticker_symbol, start_date, end_date):
        # get a list of market opens and closes for each trading day from 2015 onwards
        trading_days = mcal.get_calendar('NYSE').schedule(start_date, end_date)

        # initialize an empty list of all bars
        all_bars = []

        # for each day in our list of trading days...
        for i in range(len(trading_days)):

            # get the time at the start of the request
            request_time = time.time()

            # get the list of bars for the next day
            next_bars = self.get_date_bars(ticker_symbol, trading_days['market_open'][i], trading_days['market_close'][i])

            # print a log statement
            #TODO: Change to human readable format
            
            print(f'Got bars for {pd.to_datetime(next_bars[-1]["t"], unit="s")}')

            # add the next bars to our growing list of all bars
            all_bars += next_bars

            # sleep to ensure that no more than 200 requests occur per 60 seconds
            time.sleep(max(request_time + 60/200 - time.time(), 0))

        # return the list of all bars
        return all_bars

    def updateHistorical(self, ticker):
        #Stores historical data as json file, from date of last previous pull to yesterday

        #TODO: 
        # Add After Hours
        # Make the cutoff the second before the request (rn it's the day before)
        # Add way of visualizing the JS file (probably on the front end in react)

        start_date = '2015-01-01' #Gets updated if json exists
        end_date = pd.Timestamp.now().date() - timedelta(days = 1)

        file_path = "./historical/"+str(ticker)+".json"

        if os.path.exists(file_path):
            data = json.load(open(file_path, 'r'))
            #Update start date to the last day the data was pulled for
            print("file is there")
            most_recent = pd.to_datetime(data[-1]["t"], unit="s").date()
            start_date = most_recent + timedelta(days=1)
            print("Most Recent Date: " + str(most_recent))
            print("New Start Date: " + str(start_date))

            if (start_date < end_date):
                data.append(self.get_all_bars(ticker, start_date, end_date))
                json.dump(data, open(file_path, 'w'))
            else:
                print("Up to date as of " + str(most_recent))
        else:
            json.dump(self.get_all_bars(ticker, start_date, end_date), open(file_path, 'w'))
            print("not found")

