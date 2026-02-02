from flask import Flask, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests
import json

load_dotenv()

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": ["https://photos.stevegiordano.dev", "https://yugenfotografi.com"]}})

IMMICH_API_KEY = os.getenv('IMMICH_API_KEY')

@app.route("/images")
def hello_world():
    return {'images': ['dogimage', 'catimage', 'rabbitimage']}


@app.route('/<path:path>', methods=['GET', 'POST'])
def proxy(path):
    if request.method == 'GET':
        return requests.get((f'http://147.93.180.221:2283/api/{path}?apiKey={IMMICH_API_KEY}')).content
    
    if request.method == 'POST':
        return requests.post((f'http://147.93.180.221:2283/api/{path}?apiKey={IMMICH_API_KEY}'),json=json.loads(request.data)).content
    