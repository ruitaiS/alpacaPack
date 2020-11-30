import requests
import pandas_market_calendars as mcal
import time
import pickle
from data import Data

#Returns historical bars up to end of October
#TODO: As time goes by, you want to update the historical data, but without having to re-do it from the very beginning
def get_all_bars(ticker_symbol, start_date='2015-01-01', end_date='2020-10-31'):

    data = Data('PKHGR6CVRK7DTWFIB6Q1', 'TpSauKJD8We5hu3vvXzwp2o7UrXBfR4uzxp4Z27n')

    # get a list of market opens and closes for each trading day from 2015 onwards
    trading_days = mcal.get_calendar('NYSE').schedule(start_date, end_date)

    # initialize an empty list of all bars
    all_bars = []

    # for each day in our list of trading days...
    for i in range(len(trading_days)):

        # get the time at the start of the request
        request_time = time.time()

        # get the list of bars for the next day
        next_bars = data.get_date_bars(ticker_symbol, trading_days['market_open'][i], trading_days['market_close'][i])

        # print a log statement
        print(f'Got bars for {next_bars[-1]["t"]}')

        # add the next bars to our growing list of all bars
        all_bars += next_bars

        # sleep to ensure that no more than 200 requests occur per 60 seconds
        time.sleep(max(request_time + 60/200 - time.time(), 0))

    # return the list of all bars
    return all_bars

def 

# download and save the raw data to a pickle file (only need to do this once)
pickle.dump(get_all_bars('SPY'), open('SPY.pkl', 'wb'))

# load the raw data from the pickle file
time_bars = pickle.load(open('SPY.pkl', 'rb'))