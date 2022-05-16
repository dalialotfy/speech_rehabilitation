from flask import Blueprint,request,jsonify
import sys
sys.path.append('../project (1)')
from DB.mydb import *

users = Blueprint('Users_APIs',__name__,'modules')

@users.route("/create",methods=['POST'])
def add_user():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        email=data['email']
        print(email)
        mydb,mycursor=DB_Connection()
        mycursor.execute("USE AUDIOS")
        sql="SELECT * FROM Users WHERE Email = (%s)"
        val=(email)
        mycursor.execute(sql,(val,))
        user = mycursor.fetchall()
        print(user)
        if(user):
            return jsonify("Sorry, this email already exist")
        else:
            name=data['name']
            pw=data['pass']
            age=data['age']
            gender=data['gender']
            address=data['address']
            sql="INSERT INTO Users (Name,Email,Pass,Age,Gender,Address) VALUES (%s,%s,%s,%s,%s,%s)"
            val=(name,email,pw,age,gender,address)
            mycursor.execute(sql,val)
            mydb.commit() 
            mycursor.close()
            print(mycursor)
            return "done"
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