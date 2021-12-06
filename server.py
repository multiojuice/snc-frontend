from flask import Flask,render_template, request
from flask import jsonify
from flask_cors import CORS, cross_origin

import cloudinary
import cloudinary.uploader
app = Flask(__name__)



# After creating the Flask app, you can make all APIs allow cross-origin access.
CORS(app)

@app.route("/")
def handle_home():
    return "Hello world!"

# or a specific API
@app.route("/upload", methods=['POST'])
def upload_file():
  app.logger.info('in upload route')
  upload_result = None
  if request.method == 'POST':
    file_to_upload = request.files['file']
    app.logger.info('%s file_to_upload', file_to_upload)
    if file_to_upload:
      upload_result = cloudinary.uploader.upload(file_to_upload)
      app.logger.info(upload_result)
      return jsonify(upload_result)


app.run(host='127.0.0.1', port=3000)
