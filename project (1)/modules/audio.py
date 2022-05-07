from base64 import decode
from flask import Blueprint,request,jsonify
from random import randint
import sys
from pydub import AudioSegment
from pydub.playback import play 
from datetime import date
import sounddevice as sd
import soundfile as sf
from scipy.io.wavfile import write
import wavio as wv

sys.path.append('../project (1)')
from DB.mydb import *
from compare import *

# global Random_ID,Random_Name,Random_Path,Rec_Path
default_random=[1,"آدم","Dataset\أشخاص\آدم.wav"]
Random_ID=default_random[0]
Random_Name=default_random[1]
Random_Path=default_random[2]
Rec_Path ="Rec/24_4.wav"

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
    

# @audios.route("/record_aud",methods=['GET'])
# def record_aud():
#     Rec_File_Name="Rec/%s_%s.wav"%(date.today().day,date.today().month)
#     freq = 44100
#     duration = 2
#     # recording = sd.rec(int(duration * freq),samplerate=freq, channels=2)
#     # sd.wait()
#     # write(Rec_File_Name, freq, recording)
#     p = pyaudio.PyAudio()  # Create an interface to PortAudio
#     print('Recording')
#     stream = p.open(format=pyaudio.paInt16,channels=2,rate=freq,frames_per_buffer=1024,input=True)
#     frames = []  # Initialize array to store frames
#     for i in range(0, int(freq / 1024 * duration)):
#         data = stream.read(1024)
#         frames.append(data)
#     # Stop and close the stream 
#     stream.stop_stream()
#     stream.close()
#     # Terminate the PortAudio interface
#     p.terminate()
#     print('Finished recording')
#     # Save the recorded data as a WAV file
#     wf = wave.open(Rec_File_Name, 'wb')
#     wf.setnchannels(2)
#     wf.setsampwidth(p.get_sample_size(pyaudio.paInt16))
#     wf.setframerate(freq)
#     wf.writeframes(b''.join(frames))
#     wf.close()
#     global Rec_Path
#     Rec_Path = Rec_File_Name
#     # print("Your Record ... ")
#     # play(AudioSegment.from_wav(Rec_File_Name))
#     return "Recorded Success"

# @audios.route("/play_record",methods=['GET'])
# def play_record():
#     # print(Rec_Path)
#     # data, fs = sf.read(Rec_Path, dtype='float32')  
#     # sd.play(data, fs)
#     # status = sd.wait()
#     # return jsonify(status)
#     play(AudioSegment.from_wav(Rec_Path))
#     return jsonify(Rec_Path)

@audios.route("/similarity",methods=['GET'])
def similarity():
    print (Random_Path, " ",Rec_Path)
    result = compare(Random_Path,Rec_Path)
    print(result)
    # return jsonify(Similarity = result)
    return jsonify(Reference = ref_to_txt(Random_Path),
                   Recorded = rec_to_txt(Rec_Path),
                   Score = result)



################# Test ################   
# @audios.route("/findaudio",methods=['POST'])
# def findaudio():
#     if request.method == 'POST':
#         data = request.get_json()
#         print(data)
#         mydb,mycursor=DB_Connection()
#         mycursor.execute("USE AUDIOS")
#         sql = "SELECT Path FROM {} WHERE Aud_ID ={}".format(data["tabel"],data["id"])
#         mycursor.execute(sql)
#         paths = mycursor.fetchall()
#         print(paths[0][0])
#         return jsonify(path=paths[0][0])
#     else :
#         return "Error"

# http://127.0.0.1:8000/play/?path=rec.wav
# @audios.route("/play_audio",methods=['POST','GET'])
# def play_audio():
#     if request.method == 'POST':
#         data = request.get_json()
#         # search for the audio in db
#         mydb,mycursor=DB_Connection()
#         mycursor.execute("USE AUDIOS")
#         sql = "SELECT Path FROM {} WHERE Aud_ID ={}".format(data["tabel"],data["id"])
#         mycursor.execute(sql)
#         paths = mycursor.fetchall()
#         # play the audio
#         filename=paths[0][0]
#         data, fs = sf.read(filename, dtype='float32')  
#         sd.play(data, fs)
#         status = sd.wait()
#         return jsonify(path=paths[0][0])
#     elif request.method == 'GET':
#         print(Random_ID,' ',Random_Name,' ',Random_Path)
#         args = request.args
#         path=args.get('path')
#         data, fs = sf.read(Random_Path, dtype='float32')  
#         sd.play(data, fs)
#         status = sd.wait()
#         return jsonify(status)
#         # path=AudioSegment.from_wav(Random_Path)
#         # play(path)
#         # return 'done'


@audios.route('/record', methods=['GET'])

  #Get query parameter
def record_audio():
    # import required libraries
    import sounddevice as sd
    from scipy.io.wavfile import write
    import wavio as wv
    # mydb,mycursor=DB_Connection()
    # sql="SELECT * FROM {} WHERE Aud_ID ={}".format("أشخاص",num)
    # mycursor.execute(sql)
    # audio = mycursor.fetchall()
    # Sampling frequency
    freq = 44100

    # Recording duration
    duration = 2

   # Start recorder with the given values
   # of duration and sample frequency
    recording = sd.rec(int(duration * freq),
				samplerate=freq, channels=2)
    # b, a = sg.butter(5, 1000. / (freq / 2.), 'high')
    # x_fil = sg.lfilter(b, a, recording)
    # Record audio for the given number of seconds
    print("start recording")
    sd.wait()
    filename = "Rec/%s_%s_%s.wav"%(Random_Name,date.today().day,date.today().month)
    # This will convert the NumPy array to an audio
    # file with the given sampling frequency
    recordedAud=write(filename, freq, recording)
    return jsonify(recordedAud)


@audios.route('/play', methods=['GET'])

def play_audio():
    import sounddevice as sd
    import soundfile as sf
    # mydb,mycursor=DB_Connection()
    # sql="SELECT * FROM {} WHERE Aud_ID ={}".format("أشخاص",num)
    # mycursor.execute(sql)
    # audio = mycursor.fetchall()
    # Extract data and sampling rate from file
    filename = "Rec/%s_%s_%s.wav"%(Random_Name,date.today().day,date.today().month)
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


# @audios.route("/category",methods=['POST'])
# def GetCategory():
#     if request.method == 'POST':
#         data = request.get_json()
#         print(data)
#         mydb,mycursor=DB_Connection()
#         mycursor.execute("USE AUDIOS")
#         sql = "SELECT Name,Path FROM {}".format(data["table"])
#         mycursor.execute(sql)
#         Data = mycursor.fetchall()
#         Names=[]
#         Paths=[]
#         # print(names)
#         for index in Data:
#             Names.append(index[0])
#             Paths.append(index[1])
#         # return jsonify(Data=names)
#         return jsonify(Names=Names,Paths=Paths)
#     else :
#         return "Error"