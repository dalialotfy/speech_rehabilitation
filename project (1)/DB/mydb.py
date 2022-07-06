import mysql.connector
import os
import sys
sys.path.append('../project')

############## 1-Connect to localhost and create db if not exist
def DB_Connection():
    """Create DB Called AUDIOS if not exist and initialize connection to it
    Returns:
        DB Connection & Cursor
    """
    try:
        mydb = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="mysql")
        # print("Connected Success")
        mycursor = mydb.cursor()
        mycursor.execute("CREATE DATABASE IF NOT EXISTS AUDIOS")
        return mydb , mycursor
    except:
        print ("connection error")
        exit(1)

# TO Make Sure DB Is Created #
# mycursor.execute("SHOW DATABASES")
# for db in mycursor:
#   print(db)

############ 2-Create Tables with Folders Names and Insert Files into each Table
def Create_Tables():
    mydb,mycursor=DB_Connection()
    directory = r'Dataset' 
    for subdir, dirs, files in os.walk(directory):
        # To get subfolders in folder
        for dir in dirs:
            mycursor.execute("USE AUDIOS")
            sql="CREATE TABLE IF NOT EXISTS {}(Aud_ID int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,Name VARCHAR (255)  NOT NULL,Path VARCHAR(255) NOT NULL )".format(dir)
            # val=(dir)
            mycursor.execute(sql)
            print("Table Created Success")
            # To get files in sub folder
            path = os.path.join(directory,dir)
            for file in os.listdir(path):
                if file.endswith(".wav"):
                    fpath = os.path.join(path, file)
                    fname = os.path.splitext(file)[0]
                    mycursor.execute("USE AUDIOS")
                    ##### To Insert if not exist ######
                    sql="Insert into {Table}(Name,Path) \
                        select * from( Select %s,%s) as temp \
                        where not exists \
                        (Select name from {Table} where name=%s AND Path=%s) LIMIT 1".format(Table=dir)
                    val = (fname, fpath,fname,fpath)
                    mycursor.execute(sql, val)
                    mydb.commit()  
            print("Audios Inserted Success")
# Create_Tables()
         
def Create_Users():
    mydb,mycursor = DB_Connection()
    mycursor.execute("USE AUDIOS")
    sql="CREATE TABLE IF NOT EXISTS Users (\
        User_ID int(11) NOT NULL AUTO_INCREMENT,\
        Name varchar(14) NOT NULL,\
        Email varchar(320) NOT NULL,\
        Pass varchar(30) NOT NULL,\
        Age int(8) NOT NULL,\
        Gender enum('M','F') NOT NULL,\
        Address varchar(50) NOT NULL,\
        Role varchar(50) DEFAULT 'Patient' ,\
        PRIMARY KEY (`User_ID`))"
    mycursor.execute(sql)
    mydb.commit()  
    print("Users Table Created Success")
# Create_Users()

def Create_Records():
    mydb,mycursor = DB_Connection()
    mycursor.execute("USE AUDIOS")
    sql="CREATE TABLE IF NOT EXISTS Records (\
        Record_ID int(11) NOT NULL AUTO_INCREMENT,\
        Record_Name VARCHAR (255) NOT NULL,\
        Record_Path VARCHAR(255) NOT NULL,\
        Rec_User int(11) NOT NULL,\
        PRIMARY KEY (`Record_ID`),\
        KEY Rec_User (Rec_User),\
        FOREIGN KEY (Rec_User)\
        REFERENCES USERS (User_ID) ON DELETE CASCADE)"
    mycursor.execute(sql)
    mydb.commit()  
    print("Records Table Created Success")
# Create_Records()

def create_all():
    Create_Tables()
    Create_Users()
    Create_Records()
# create_all()    

