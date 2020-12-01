from data import Data
from datetime import datetime, date
import pandas as pd

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

def updateHistorical(ticker):
    #Checks if there's already a pickle file, pulls dates from the previous pull to the present

    end_date = pd.Timestamp.now().date()
    start_date = ''

    listA = [1]
    listB = [2]

    file_path = "./historical/"+str(ticker)+".jsn"

    '''
    Pseudo:
        if no file exists:
            start_date='2015-01-01'
            pickle under ticker_symbol.pkl
        else:
            open previous pickle file to see the last entry
            append new stuff
            repickle
    '''

    if os.path.exists(file_path):
        data = json.load(open(file_path, 'r'))
        print("file is there")
        print(data)
    else:
        json.dump(listA, open(file_path, 'w'))
        print("not found")


#time()
#testData()
updateHistorical("TSLA")