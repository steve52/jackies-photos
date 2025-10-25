from flask import Flask, jsonify
from dotenv import load_dotenv
import os
import requests

load_dotenv()

app = Flask(__name__)

IMMICH_API_KEY = os.getenv('IMMICH_API_KEY')
@app.route("/images")
def hello_world():
    return {'images': ['dogimage', 'catimage', 'rabbitimage']}

@app.route('/tags')
def get_tags():
    try:
        response = requests.get(f'http://147.93.180.221:2283/api/tags?apiKey={IMMICH_API_KEY}')
        # Raises an HTTPError if the HTTP request returned an unsuccessful status code
        response.raise_for_status()  
        data = response.json()
    except requests.exceptions.HTTPError as http_err:
        return jsonify({'error': f'HTTP error occurred: {http_err}'}), 500
    except Exception as err:
        return jsonify({'error': f'Other error occurred: {err}'}), 500
    return data