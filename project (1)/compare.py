import speech_recognition as sr
import os
import librosa
# import pyaudio
import wave
from pydub import AudioSegment
from pydub.playback import play 
import sys
sys.path.append('../project')


def rec_to_txt(rec_path):
    r = sr.Recognizer()
    print(rec_path)
    with sr.AudioFile(rec_path) as source:
        audio_data = r.record(source)
        rec_txt = r.recognize_google(audio_data,language='ar-EG')
        print(rec_txt)
    return rec_txt

def ref_to_txt(ref_path):
    x=ref_path.split('\\')
    print(x)
    ref_txt = os.path.splitext(x[2])[0]
    print(ref_txt)
    return ref_txt
    
def jaccard_similarity(x,y):
    """ returns the jaccard similarity between two lists """
    intersection_cardinality = len(set.intersection(*[set(x), set(y)]))
    union_cardinality = len(set.union(*[set(x), set(y)]))
    return intersection_cardinality/float(union_cardinality)

def compare(ref_path,rec_path):
    validation=jaccard_similarity(ref_to_txt(ref_path),rec_to_txt(rec_path))
    if ((validation*100) <= 40):
        return "Wrong Pronounciation"
    else:
        ## Reference audio data
        data1,sr1=librosa.load(ref_path)
        n_fft = int(0.025*sr1)      # 25 ms
        hop_length = int(0.01*sr1)  # 10 ms
        mfcc1 = librosa.feature.mfcc(y=data1, sr=sr1, n_mfcc=13, norm="ortho",hop_length=hop_length, n_fft=n_fft)
        x_seq = mfcc1.T
        ## Record audio data
        data2 ,sr2= librosa.load(rec_path)
        mfcc2 = librosa.feature.mfcc(y=data2, sr=sr2, n_mfcc=13, norm="ortho",hop_length=hop_length, n_fft=n_fft)
        y_seq = mfcc2.T 
        ## Comparison 
        D, wp = librosa.sequence.dtw(X=mfcc1, Y=mfcc2, metric='cosine')
        N = y_seq.shape[0]
        M = x_seq.shape[0]
        distance=D[-1, -1]/(M + N)
        return (((100-(distance*1000))+10 ),"%")
 
def play_Ref(file_path):
    return play(AudioSegment.from_wav(file_path))
    # return play(AudioSegment.from_wav("./Dataset\أشخاص\شروق.wav"))
        
# def record(file_path):
#     seconds = 2
#     p = pyaudio.PyAudio()  # Create an interface to PortAudio
#     print('Recording')
#     stream = p.open(format=pyaudio.paInt16,channels=2,rate=44100,frames_per_buffer=1024,input=True)
#     frames = []  # Initialize array to store frames
#     for i in range(0, int(44100 / 1024 * seconds)):
#         data = stream.read(1024)
#         frames.append(data)
#     # Stop and close the stream 
#     stream.stop_stream()
#     stream.close()
#     # Terminate the PortAudio interface
#     p.terminate()
#     print('Finished recording')
#     # Save the recorded data as a WAV file
#     wf = wave.open(file_path, 'wb')
#     wf.setnchannels(2)
#     wf.setsampwidth(p.get_sample_size(pyaudio.paInt16))
#     wf.setframerate(44100)
#     wf.writeframes(b''.join(frames))
#     wf.close()
#     print("Your Record ... ")
#     play(AudioSegment.from_wav(file_path))
    


ref_file_name = "./Dataset\أشخاص\شروق.wav"
rec_file_name = "rec.wav" 
# play_Ref(ref_file_name)
# record(rec_file_name)
# print(compare(ref_file_name,rec_file_name))


# from importlib.resources import path
# import mysql.connector
# from DB.mydb import *

# def Find_Audio(Table,Audio):
#     """Search For Specific Audio in Specific Table

#     Args:
#         Table: Category to search in
#         Audio: Audio to search for

#     Returns:
#         Path: local path of the audio in DataSet Folder
#     """
#     mydb,mycursor=DB_Connection()
#     mycursor.execute("USE AUDIOS")
#     # sql = "SELECT Path FROM Persons WHERE Name ='Ahmed' "
#     sql = "SELECT Path FROM {} WHERE Name ='{}'".format(Table,Audio)
#     mycursor.execute(sql)
#     paths = mycursor.fetchall()
#     print(paths[0][0])
#     return path
#     # file=os.startfile(paths[0][0])
    
# Find_Audio("Persons","Ahmed")
# Find_Audio("Objects","Dolaab")