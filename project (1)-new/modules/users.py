from flask import Blueprint,request,jsonify, make_response, session, current_app

import jwt
from datetime import datetime, timedelta
from functools import wraps

import sys
sys.path.append('../project (1)')
from DB.mydb import *


users = Blueprint('Users_APIs',__name__,'modules')

# def token_required(func):
#     @wraps(func)
#     def decorated(*args, **kwargs):
#         token = request.args.get('token')
#         if not token:
#             return jsonify({'ALERT':'Token is missing'})
#         try:
#           payload= jwt.decode(token, current_app.config['SECRET_KEY'])
#           return payload
#         except:
#           return jsonify({'ALERT':'Invalid Token!'})
#     return decorated

@users.route('/main')
def main():
    if not session.get('logged_in'):
        return jsonify({'Message':'Please, Log In or Sign up'})
    else:
        return jsonify({'Message':'Logged In currently'})

@users.route('/public')
def public():
    return 'For Public'

@users.route('/auth')
# @token_required
def auth():
    token = request.args.get('token')
    if not token:
        return jsonify({'ALERT':'Token is missing'})
    try:
        payload= jwt.decode(token, current_app.config['SECRET_KEY'])
        if payload['user_role'] == 'patient':
            return jsonify({'Status':'Authorized','Data':payload})
        else:
            print(payload)
            return jsonify({'Status':'UnAuthorized'})
    except:
        print(payload)
        return jsonify({'ALERT':'Invalid Token!'})
    
@users.route('/logIn',methods=['POST'])
def log_in():
    data=request.get_json()
    mydb,mycursor=DB_Connection()
    mycursor.execute("USE AUDIOS")
    try:
        sql = "SELECT * FROM Users Where Email=%s"
        val=(data['email'])
        mycursor.execute(sql,(val,))
        User = mycursor.fetchone()
        if not User:
            return jsonify({"msg":"Email Not Found, Please Enter a valid email"})
        else:
            if data['pass']!=User[3]:
                return jsonify({"message":"Wrong Password"})
            else:    
                print (User)
                session['logged_in']=True
                session['role']="Doctor"
                token = jwt.encode({
                    'user_ID':User[0],
                    'user_Name':User[1],
                    'user_email':data['email'],
                    'user_age':User[4],
                    'user_gender':User[5],
                    'user_address':User[6],
                    'user_role':User[7],
                    'expiration':str(datetime.utcnow()+timedelta(minutes=15))},
                    current_app.config['SECRET_KEY'])
                # return jsonify({'Message':"{role} {name} Logged In Successfully".format(role=User[7],name=User[1]),'Token':token.decode('utf-8')})
                return jsonify({'Message':"Success {role}".format(role=User[7]),'Token':token})
    except Exception as e:
        return jsonify({"Error":str(e)})
    
@users.route("/create",methods=['POST'])
def add_user():
    if request.method == 'POST':
        data = request.get_json()
        # print(data)
        email=data['email']
        # print(email)
        mydb,mycursor=DB_Connection()
        mycursor.execute("USE AUDIOS")
        sql="SELECT * FROM Users WHERE Email = (%s)"
        val=(email)
        mycursor.execute(sql,(val,))
        user = mycursor.fetchall()
        print(user)
        if(user):
            return jsonify({"message":"Sorry, this email already exist"})
        else:
            name=data['name']
            pw=data['pass']
            age=data['age']
            gender=data['gender']
            address=data['address']
            Role=data['role']
            sql="INSERT INTO Users (Name,Email,Pass,Age,Gender,Address,Role) VALUES (%s,%s,%s,%s,%s,%s,%s)"
            val=(name,email,pw,age,gender,address,Role)
            mycursor.execute(sql,val)
            mydb.commit() 
            mycursor.close()
            print(mycursor)
            return jsonify({"message":"Success"})
    else :
        return "Error"

@users.route("/getUser/",methods=['GET'])
def get_user():
    email = request.args.get('email')
    mydb,mycursor=DB_Connection()
    mycursor.execute("USE AUDIOS")
    sql = "SELECT * FROM Users Where Email=%s"
    val=(email)
    mycursor.execute(sql,(val,))
    Data = mycursor.fetchall()
    return jsonify(Data)
    
# Find_Audio("Persons","Ahmed")
# Find_Audio("Objects","Dolaab")


# @users.route('/logIn',methods=['POST'])
# def log_in():
#     data=request.get_json()
#     mydb,mycursor=DB_Connection()
#     mycursor.execute("USE AUDIOS")
#     try:
#         sql = "SELECT * FROM Users Where Email=%s"
#         val=(data['email'])
#         mycursor.execute(sql,(val,))
#         User = mycursor.fetchone()
#         if not User:
#             return jsonify({"msg":"Email Not Found, Please Enter a valid email"})
#         else:
#             if data['pass']!=User[3]:
#                 return jsonify({"message":"Wrong Password"})
#             else:    
#                 # return redirect(url_for("home"))
#                 # return jsonify({"msg":"You Are Redirected"})
#                 return jsonify({"message":"Success"})
#     except Exception as e:
#         return jsonify({"Error":str(e)})