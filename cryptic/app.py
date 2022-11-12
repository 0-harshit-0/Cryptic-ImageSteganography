from flask import Flask, url_for, render_template, request, send_from_directory, abort, jsonify, make_response
from werkzeug.utils import secure_filename
import steg
import os

app = Flask(__name__)
# don't copy paste it on pythonanywhere, because the upload folder path is diff


@app.route("/")
def homepage():
    return render_template('index.html')

@app.route("/GUI" or "/gui")
def grphicalInterface():
    return render_template('gui.html')

@app.route("/static/serviceworker.js")
def sw():
    response=make_response(send_from_directory('static', 'serviceworker.js'))
    #change the content header file. Can also omit; flask will handle correctly.
    response.headers['Service-Worker-Allowed'] = '/'
    return response

@app.route("/hide", methods=["POST", "GET"])
def hidepage():
    if request.method == 'POST':
        print("hide")
        hidefile = request.files["hide"] #get the file to hide
        imgfile = request.files["img"]  #get the image file to hide into

        hidefileName = secure_filename(hidefile.filename)
        imgfileName = "1"+secure_filename(imgfile.filename)
        #print(hidefileName, imgfileName)

        
        # -------save both the files--------
        hidefile.save(f"uploads/{hidefileName}")
        imgfile.save(f"uploads/{imgfileName}")
        # --------files saved------------

        # ------getting the file extension------
        split_tup = os.path.splitext("uploads/"+hidefileName) 
        ext = split_tup[1]
        # ---getting the file size----
        if(ext == '.txt'):
            txt = open("uploads/"+hidefileName, "r")
            file_size = len(txt.read()+"\0")
            txt.close()
        else:
            file_size = os.path.getsize("uploads/"+hidefileName)

        # ------ sending the files and and info to steg.py -----
        steg.K("uploads/"+hidefileName, "uploads/"+imgfileName, ext, file_size)

        # -------- deleting the recieved files --------
        os.remove("uploads/"+hidefileName)
        os.remove("uploads/"+imgfileName)
        

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

        imgfileName = secure_filename(imgfile.filename)

        # -------save both the files--------
        imgfile.save(f"uploads/{imgfileName}")
        # --------files saved------------

        # ------sending the image to steg.py and getting the file extension in return ------
        ext = steg.L("uploads/"+imgfileName)

        # -------- deleting the recieved files --------
        os.remove("uploads/"+imgfileName)

        # ----- sending hidden.png back to user / if error send 404 ------
        try:
            return send_from_directory("uploads/", "decoded"+ext, as_attachment=True)
        except FileNotFoundError:
            abort(404)
    else:
        if os.path.exists("uploads/decoded"+ext):
            os.remove("uploads/decoded"+ext)

        return ext

