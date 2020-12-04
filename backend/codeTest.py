from historicalData import Data
from datetime import datetime, date, timedelta
import pandas as pd

import time

#Used for updateHistorical
import json
import os


#Login Data
key_id = 'PKHGR6CVRK7DTWFIB6Q1'
secret_key = 'TpSauKJD8We5hu3vvXzwp2o7UrXBfR4uzxp4Z27n'
base_url ='https://paper-api.alpaca.markets'

'''
#Live:
key_id = 'AKPRT5OLOR2QG8NWKIRF'
secret_key = '2h0JwR4hoebs9udjZOtfzCrwlupXBu1MibK6AfrZ'
base_url = 'https://api.alpaca.markets'
'''

def test_time():
    
    date_time = pd.Timestamp.now()
    date = pd.Timestamp.now().date()
    today_open = pd.Timestamp(str(date)+" 09:30:00")


    #Date
    print(date)

    #Current time in ISO format:
    print(date_time.isoformat())

    #Current time as epoch:
    print("Epoch: " + str(date_time.timestamp()))

    #Converting Epoch to iso:
    print(pd.Timestamp(date_time.timestamp()).isoformat())

    print("test: " + str(pd.to_datetime(1606769940, unit='s').date()))

    #9:30 opening time in ISO format:
    print(today_open.isoformat())#end print

    print("Yesterday:")
    print(date - timedelta(days=1))

    print("Time.time()")
    print(time.time())

def testData():
    current_time = pd.Timestamp.now()
    date = pd.Timestamp.now().date()
    open_time = pd.Timestamp(str(date)+" 09:30:00")

    data = Data(key_id, secret_key)

    for element in data.get_date_bars('TSLA', open_time, current_time):
        print(element)

def test_updateHistorical(ticker):
    data = Data('PKHGR6CVRK7DTWFIB6Q1', 'TpSauKJD8We5hu3vvXzwp2o7UrXBfR4uzxp4Z27n')
    #file_path = "./historical/"+str(ticker)+".json"
    #jsData = data.get_all_bars(ticker, '2020-11-25', '2020-11-29')
    #json.dump(jsData, open(file_path, 'w'))

    data.updateHistorical(ticker)



#test_time()
#testData()
test_updateHistorical("TSLA")