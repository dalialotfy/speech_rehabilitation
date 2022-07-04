from email.mime import audio
from DB.mydb import *
from flask import Flask , request,jsonify,Blueprint
from flask_cors import CORS, cross_origin
from modules.users import *
from modules.audio import *


app=Flask(__name__)

CORS(app)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})

app.register_blueprint(audios)
app.register_blueprint(users)

@app.route("/")
def main():
    return 'main'
if __name__ == "__main__":
    # app.run(host='192.168.188.174', port= 8000, debug=True)
    app.run(host= '192.168.1.7',port= 8000,debug=False)
    # app.run(port= 8000,debug=False)