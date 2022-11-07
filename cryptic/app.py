from flask import Flask, url_for, render_template, request, send_from_directory, abort, jsonify, make_response
from werkzeug.utils import secure_filename
import steg
import os

app = Flask(__name__)



@app.route("/")
def homepage():
    url_for('static', filename='assets/typeaudio.mp3')
    url_for('static', filename='styles/style.css')
    url_for('static', filename='styles/mystyle.css')
    url_for('static', filename='src/script.js')
    url_for('static', filename='src/standardPX.js')
    url_for('static', filename='src/bg.js')
    return render_template('index.html')

@app.route("/GUI" or "/gui")
def grphicalInterface():
    return render_template('gui.html')

@app.route("/hide", methods=["POST", "GET"])
def hidepage():
    if request.method == 'POST':
        print("hide")
        hidefile = request.files["hide"] #get the file to hide
        imgfile = request.files["img"]  #get the image file to hide into
        #print(imgfile)
        
        # -------save both the files--------
        hidefile.save(f"uploads/{secure_filename(hidefile.filename)}")
        imgfile.save(f"uploads/{secure_filename(imgfile.filename)}")
        # --------files saved------------

        # ------getting the file extension------
        split_tup = os.path.splitext("uploads/"+secure_filename(hidefile.filename)) 
        ext = split_tup[1]
        # ---getting the file size----
        if(ext == '.txt'):
            txt = open("uploads/"+secure_filename(hidefile.filename), "r")
            file_size = len(txt.read()+"\0")
            txt.close()
        else:
            file_size = os.path.getsize("uploads/"+secure_filename(hidefile.filename))

        # ------ sending the files and and info to steg.py -----
        steg.K("uploads/"+secure_filename(hidefile.filename), "uploads/"+secure_filename(imgfile.filename), ext, file_size)

        # -------- deleting the recieved files --------
        os.remove("uploads/"+secure_filename(hidefile.filename))
        os.remove("uploads/"+secure_filename(imgfile.filename))
        

        # ----- sending hidden.png back to user / if error send 404 ------
        try:
            return send_from_directory("uploads/", "hidden.png", as_attachment=True)
        except FileNotFoundError:
            abort(404)
    else:
        if os.path.exists("uploads/hidden.png"):
            os.remove("uploads/hidden.png")

        return "clear";


@app.route("/unhide", methods=["POST", "GET"])
def unhidepage():
    global ext
    if request.method == 'POST':
        print("unhide")
        imgfile = request.files["img"]  #get the image file to unhide from

        # -------save both the files--------
        imgfile.save(f"uploads/{secure_filename(imgfile.filename)}")
        # --------files saved------------

        # ------sending the image to steg.py and getting the file extension in return ------
        ext = steg.L("uploads/"+secure_filename(imgfile.filename))

        # -------- deleting the recieved files --------
        os.remove("uploads/"+secure_filename(imgfile.filename))

        # ----- sending hidden.png back to user / if error send 404 ------
        try:
            return send_from_directory("uploads/", "decoded"+ext, as_attachment=True)
        except FileNotFoundError:
            abort(404)
    else:
        if os.path.exists("uploads/decoded"+ext):
            os.remove("uploads/decoded"+ext)

        return ext

