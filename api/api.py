from flask import Flask, request
from dotenv import load_dotenv
import os
import requests

load_dotenv()

app = Flask(__name__)

IMMICH_API_KEY = os.getenv('IMMICH_API_KEY')

@app.route("/images")
def hello_world():
    return {'images': ['dogimage', 'catimage', 'rabbitimage']}


@app.route('/<path:path>', methods=['GET', 'POST'])
def proxy(path):
    print('path', path)
    if request.method == 'GET':
        print('get')
        return requests.get((f'http://147.93.180.221:2283/api/{path}?apiKey={IMMICH_API_KEY}')).content
    
    if request.method == 'POST':
        print('post')
        return requests.post((f'http://147.93.180.221:2283/api/{path}?apiKey={IMMICH_API_KEY}')).content
    