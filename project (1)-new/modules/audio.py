from base64 import decode
from pickle import GET
from flask import Blueprint,request,jsonify,session, current_app
from random import randint
import sys
from numpy import int32, record
from pydub import AudioSegment
from pydub.playback import play 
from datetime import date
import sounddevice as sd
import soundfile as sf
from scipy.io.wavfile import write
import wavio as wv
import jwt
from datetime import datetime, timedelta
from functools import wraps

sys.path.append('../project (1)')
from DB.mydb import *
from compare import *

# global Random_ID,Random_Name,Random_Path,Rec_Path
default_random=[1,"آدم","Dataset\أشخاص\آدم.wav"]
Random_ID=default_random[0]
Random_Name=default_random[1]
Random_Path=default_random[2]
Rec_Path ="Dataset\أشخاص\آدم.wav"
# global Rec_Path

audios = Blueprint('Audio_APIs',__name__,'modules')

@audios.route("/random_audio",methods=['GET'])
def RandAud():
    # data = request.get_json()
    # print(data)
    mydb,mycursor=DB_Connection()
    mycursor.execute("USE AUDIOS")
    # sql="SELECT MAX(Aud_ID) FROM {}".format(data["tabel"])
    sql="SELECT MAX(Aud_ID) FROM {}".format("أشخاص")
    mycursor.execute(sql)
    IDs = mycursor.fetchall()
    max=IDs[0][0]
    num = randint(1,max)
    mycursor.execute("USE AUDIOS")
    # sql="SELECT * FROM {} WHERE Aud_ID ={}".format(data["tabel"],num)
    sql="SELECT * FROM {} WHERE Aud_ID ={}".format("أشخاص",num)
    mycursor.execute(sql)
    audio = mycursor.fetchall()
    print(audio)
    global Random_ID,Random_Name,Random_Path
    Random_ID = audio[0][0]
    Random_Name=audio[0][1]
    Random_Path = audio[0][2]
    return jsonify(ID=audio[0][0],Aud_Name=audio[0][1],Aud_Path=audio[0][2])


@audios.route("/play_random",methods=['GET'])
def play_random():
    print(Random_ID,' ',Random_Name,' ',Random_Path)
    data, fs = sf.read(Random_Path, dtype='float32')  
    sd.play(data, fs)
    status = sd.wait()
    return jsonify(status)
    # play(AudioSegment.from_wav(Random_Path))
    # return jsonify(Random_ID,Random_Name,Random_Path)

@audios.route("/similarity",methods=['GET'])
def similarity():
    print (Random_Path, " ",Rec_Path)
    result = compare(Random_Path,Rec_Path)
    print(result)
    try:
        mydb,mycursor=DB_Connection()
        mycursor.execute("USE AUDIOS")
        # sql="UPDATE `records` SET Score=%s WHERE Record_Path=%s"%(result,str(Rec_Path))
        sql ="UPDATE records SET Score={} WHERE Record_Path=%s".format(result.split(' ')[0])
        mycursor.execute(sql,(Rec_Path,))
        mydb.commit()
        print(mycursor.rowcount, 'affected')
        return jsonify(Reference = ref_to_txt(Random_Path),Recorded = rec_to_txt(Rec_Path),Score = result)    
    except Exception as e: 
      print('An exception occurred')
      return jsonify({"Error":str(e)})


# http://localhost:8000/record?token=
@audios.route('/record', methods=['GET'])
  #Get query parameter
def record_audio():
    # import required libraries
    import sounddevice as sd
    from scipy.io.wavfile import write
    import wavio as wv
    token = request.args.get('token')
    if not token:
        return jsonify({'ALERT':'Token is missing'})
    try:
        payload= jwt.decode(token, current_app.config['SECRET_KEY'],algorithms=['HS256'])
        if payload['user_role'] == 'patient':
            freq = 44100
            duration = 2
            recording = sd.rec(int(duration * freq),samplerate=freq, channels=2,dtype=int32)
            print("start recording")
            sd.wait()
            # Rec_name = Day_Month_Name_UserID
            Rec_name="%s_%s_%s_%s"%(date.today().day,date.today().month,Random_Name,payload['user_ID'])
            global Rec_Path
            Rec_Path="Rec/%s.wav"%(Rec_name)
            recordedAud=write(Rec_Path, freq, recording)
            try:
                mydb,mycursor=DB_Connection()
                mycursor.execute("USE AUDIOS")  
                sql="INSERT INTO Records (Record_Name,Record_Path,Rec_User) VALUES (%s,%s,%s)"
                val=(Rec_name,Rec_Path,payload['user_ID'])
                mycursor.execute(sql,val)
                mydb.commit() 
                mycursor.close()
                return jsonify({'Status':'Recorded Success','Data':Rec_Path})
            except Exception as e:
                return jsonify({"Error":str(e)})
        else:
            # print(payload)
            return jsonify({'Status':'UnAuthorized'})
    except Exception as e:
        # print(payload)
        return jsonify({"Error":str(e),'ALERT':'Invalid Token!'})

@audios.route('/play', methods=['GET'])
def play_audio():
    import sounddevice as sd
    import soundfile as sf
    # mydb,mycursor=DB_Connection()
    # sql="SELECT * FROM {} WHERE Aud_ID ={}".format("أشخاص",num)
    # mycursor.execute(sql)
    # audio = mycursor.fetchall()
    # Extract data and sampling rate from file
    filename = Rec_Path
    data, fs = sf.read(filename, dtype='float32')  
    play=sd.play(data, fs)
    status = sd.wait()  # Wait until file is done playing
    print("play")
    return jsonify(play)

@audios.route("/category/",methods=['POST','GET'])
def GetCategory():
    if request.method == 'POST':
        data = request.get_json()
        table=data["table"]
    elif request.method == 'GET':
        print(Random_ID,' ',Random_Name,' ',Random_Path)
        table = request.args.get('table')
    else :
        return "Error"
    mydb,mycursor=DB_Connection()
    mycursor.execute("USE AUDIOS")
    sql = "SELECT Aud_ID,Name,Path FROM {}".format(table)
    mycursor.execute(sql)
    Data = mycursor.fetchall()
    id=[]
    Names=[]
    Paths=[]
    for index in Data:
        id.append(index[0])
        Names.append(index[1])
        Paths.append(index[2])
    return jsonify(id=id,Names=Names,Paths=Paths)

@audios.route("/findname/",methods=['GET'])
def findname ():
    table = request.args.get('table')
    id = request.args.get('id')
    mydb,mycursor=DB_Connection()
    mycursor.execute("USE AUDIOS")
    sql = "SELECT Name,Path FROM {} WHERE Aud_ID ={}".format(table,id)
    mycursor.execute(sql)
    path = mycursor.fetchall()
    data, fs = sf.read(path[0][1], dtype='float32')  
    print(data)
    status=sd.play(data, fs)
    play=sd.wait()
    
    # return jsonify(data)
    return jsonify(play=play,path=path[0][1])

@audios.route('/get_list',methods=['POST'])
def get_list():
    try:
        res = request.get_json()
        print(res['pathArray'])
        paths=[]
        if res['pathArray']:
            for obj in res['pathArray']:
                table = obj["table"]
                id = obj["id"]
                mydb,mycursor=DB_Connection()
                mycursor.execute("USE AUDIOS")
                sql = "SELECT Name,Path FROM {} WHERE Aud_ID ={}".format(table,id)
                mycursor.execute(sql)
                path = mycursor.fetchall()
                paths.append(path[0][1])  
            for path in paths:    
                data,fs = sf.read(path,dtype='float32')  
                play=sd.play(data, fs)
                status = sd.wait() 
            return jsonify({"msg":"played success"})
            # return jsonify(play=status)

        else: 
            return jsonify({"msg":"Error, من فضلك كون جمله"})
    except Exception as e:
        return jsonify({"Error":str(e)})
    
from matplotlib import pyplot as plt
import librosa.display

@audios.route('/display',methods=['GET'])
def display():
    try:
        data1,sr1=librosa.load(Random_Path)    ######### REF AUDIO
        plt.figure(figsize=(15,5))
        plt.title("Reference")
        librosa.display.waveplot(data1,sr1,color='r',alpha=0.5)
        ref_plot="./plot/reference.png"
        plt.savefig(ref_plot)
        
        data2,sr2=librosa.load(Rec_Path)         ######### RECORDED AUD
        plt.figure(figsize=(15,5))
        plt.title("Record")
        librosa.display.waveplot(data2,sr2,color='g',alpha=0.5)
        rec_plot="./plot/record.png"
        plt.savefig(rec_plot)
        return jsonify({"Ref":ref_plot,"Rec":rec_plot})
    except Exception as e:
        return jsonify({"Error":str(e)})

# http://127.0.0.1:8000/history?token=
@audios.route('/history',methods=['GET'])
def history():
    token = request.args.get('token')
    if not token:   
        return jsonify({'ALERT':'Token is missing'})  
    try:
        payload= jwt.decode(token, current_app.config['SECRET_KEY'],algorithms=['HS256'])
        print(payload)
        if payload['user_role'] == 'patient':
            try:
                mydb,mycursor=DB_Connection()
                mycursor.execute("USE AUDIOS")  
                sql="SELECT * FROM Records WHERE Rec_User={}".format(payload['user_ID'])
                # val=(payload['user_ID'])
                mycursor.execute(sql)
                Data=mycursor.fetchall()
                return jsonify({'Status':'Success','Data':Data})
            except Exception as e:
                return jsonify({"Error":str(e)})
        elif payload['user_role'] == 'doctor':
            try:
                mydb,mycursor=DB_Connection()
                mycursor.execute("USE AUDIOS")  
                # sql="SELECT User_ID,Name,Email,Age,Gender,Address,Record_ID,Record_Name,Record_Path,Score FROM (SELECT * FROM Users JOIN Records ON Users.User_ID=Records.Rec_User) AS History GROUP BY User_ID"
                sql="SELECT User_ID,Name,Email,Age,Gender,Address,Record_ID,Record_Name,Record_Path,Score FROM (SELECT * FROM Users JOIN Records ON Users.User_ID=Records.Rec_User) AS History"
                # val=(payload['user_ID'])
                mycursor.execute(sql)
                Data=mycursor.fetchall()
                return jsonify({'Status':'Success','Data':Data})
            except Exception as e:
                return jsonify({"Error":str(e)})
        else:
            # print(payload)
            return jsonify({'Status':'UnAuthorized'})
            
    except Exception as e:
        return jsonify({"Error":str(e)})

# try:
#     mydb,mycursor=DB_Connection()
#     mycursor.execute("USE AUDIOS")  
#     sql="SELECT * FROM Users JOIN Records ON User_ID=Rec_User "
#     # val=(payload['user_ID'])
#     mycursor.execute(sql)
#     Data=mycursor.fetchall()
#     print({'Status':'Success','Data':Data})
# except Exception as e:
#     print({"Error":str(e)})