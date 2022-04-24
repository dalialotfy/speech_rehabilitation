from flask import Blueprint,request,jsonify
import sys
sys.path.append('../project(1)')
from DB.mydb import *

users = Blueprint('Users_APIs',__name__,'modules')

@users.route("/create",methods=['POST'])
def add_user():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        mydb,mycursor=DB_Connection()
        mycursor.execute("USE AUDIOS")
        sql="Insert into {Table}(First_Name,Last_Name,Email,Pass,Birth_Date,Gender) \
            select * from( Select %s,%s,%s,%s,STR_TO_DATE(%s,'%d,%m,%Y'),%s) as temp where not exists \
            (Select Email from {Table} where Email={email}) LIMIT 1".format(Table='users',email=data['email'])
        val = (data['fname'],data['lname'],data['email'],data['pass'],data['BD'],data['gender'])
        mycursor.execute(sql,val)
        # records = mycursor.fetchall()
        mydb.commit() 
        mycursor.close()
        # return jsonify(user=found)
        return "done"
    else :
        return "Error"


    
# Find_Audio("Persons","Ahmed")
# Find_Audio("Objects","Dolaab")