
from flask import Flask , request
from flask_cors import CORS
from flask import jsonify

# Create flask & cors instance 
app = Flask(__name__)
cors = CORS()

cors.init_app(app)



# Serve ESP 8266 Get request with RSSI(received signal strength indicator).
@app.route('/record', methods=['GET'])

  #Get query parameter
def record_audio():
    # import required libraries
    import sounddevice as sd
    from scipy.io.wavfile import write
    import wavio as wv

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
    filename = "recordedAudios"+  ".wav"
    # This will convert the NumPy array to an audio
    # file with the given sampling frequency
    recordedAud=write(filename, freq, recording)
    return jsonify(recordedAud)


@app.route('/play', methods=['GET'])

def play_audio():
    import sounddevice as sd
    import soundfile as sf
    # Extract data and sampling rate from file
    filename = "recordedAudios"+  ".wav"
    data, fs = sf.read(filename, dtype='float32')  
    play=sd.play(data, fs)
    status = sd.wait()  # Wait until file is done playing
    print("play")
    return jsonify(status)

    
if __name__ == "__main__":
    app.run(host='0.0.0.0', port= 8090,debug=True)