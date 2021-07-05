#!/usr/bin/python3

import json
import os

def write_json(data, filename='data.json'):
    with open(filename, 'w') as f:
        json.dump(data, f)


path = './bts_rm'

files = os.listdir(path)

for f in files:
	print(f)


j = {
    'name' : 'RM',
    'groupName' : 'BTS',
    'company' : 'HYBE',
    'gender' : 'male',
    'picCount' : len(f),
    'items' : files
}

write_json(j, path+"/data.json")
