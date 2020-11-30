from data import Data
from datetime import datetime, date
import pandas as pd

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

def time():
    
    date_time = pd.Timestamp.now()
    date = pd.Timestamp.now().date()
    today_open = pd.Timestamp(str(date)+" 09:30:00")


    #Date
    print(date)

    #Current time in ISO format:
    print(date_time.isoformat())

    #Current time as epoch:
    print(date_time.timestamp())

    #9:30 opening time in ISO format:
    print(today_open.isoformat())#end print

def testData():
    current_time = pd.Timestamp.now()
    date = pd.Timestamp.now().date()
    open_time = pd.Timestamp(str(date)+" 09:30:00")

    data = Data(key_id, secret_key)

    for element in data.get_date_bars('TSLA', open_time, current_time):
        print(element)

#time()
testData()