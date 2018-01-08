# EDUCAST

A video chat that works offline using intranet. 

### Purpose 
To help solve the education problem in rural areas of India, where network infrastructure exists but internet connectivity is an issue.

### Description 

Educast helps teachers broadcast their lectures which can then be viewed realtime in any of the computers connected in the same network ( Intranet ).

Basically, We built a realtime video broadcast app, which which works offline with no connection to external internet whatsoever. 

### Demo 

Open the [broadcast link](https://ed5d0e93.ngrok.io/) in chrome ( preferrably in a laptop, as getUserMedia() has issues on phone ) . This will start broadcasting the video captured from this machine

Open the [client link](https://ed5d0e93.ngrok.io//client.html) on another machine to view the video. 

### Installation

To use it locally on your intranet, follow these steps:
* clone this github repo 
* navigate to the folder on your local machine
* open a terminal and run `npm install`
* the previous step will start the server listening on port 5000, you can access the app by loading `localhost:5000` in your browser, the client can be accessed through `localhost:5000/client.html`

### TODO
The broadcasted video is a bit laggy, but efforts are being put in to make it realtime , also a major TODO is to add audio :)
