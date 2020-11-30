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

#today = date.today().strftime("%Y-%m-%d")
#open_time = str(datetime.now().strftime("%Y-%m-%dT09:30:00"))
#current_time = str(datetime.now().strftime("%Y-%m-%dT%H:%M:%S"))

def time():
    #Date
    print(pd.Timestamp.now().date())

    #Current time in ISO format:
    print(pd.Timestamp.now().isoformat())

    #Current time as epoch:
    print(pd.Timestamp.now().timestamp())

def testData():
    data = Data(key_id, secret_key)
    data.get_date_bars('TSLA', open_time, current_time)

time()
#testData()