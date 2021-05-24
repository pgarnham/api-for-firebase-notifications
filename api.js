const express = require('express');
const axios = require('axios');
const db = require('./models/index.js');
var bodyParser = require('body-parser');
var cors = require('cors');

const { Client } = require('pg');



const app = express();
app.use(cors());
var jsonParser = bodyParser.json()
const port = process.env.PORT || 5000;

var urlencodedParser = bodyParser.urlencoded({ extended: false })



// routes will go here

app.get('/', function(req, res) {
  res.send("Hi, this is a Express API");
});

var tokens = new Set();

app.post('/new-user', jsonParser, function(req, res) {
    console.log("Request desde insomnia",req.body.token);
    console.log(req.body);
    const newToken = req.body.token
  
    tokens.add(newToken);
    res.send({
      'status': "success",
      'token': newToken
    });

  });




let config = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": "key= AAAAnsO9YbA:APA91bHN4Iyw0TnjZcXmxTa0YVwm9LV-vdLlbB621AklmH4mFXXYslggJuidldlvRAnP-R03Iz2uqomfqs02L63npHJIMb3Zbt1tJltLmlyasSz7yAzb356ldNAMLE2wBoNkdipLCJ8D"
    }
  }



app.post('/send-message', jsonParser, function(req, res) {
    const message = req.body.message;
    const senderToken = req.body.token;
    const user = req.body.user;

    
    tokens.forEach(receiver => {
      if (receiver != senderToken) {
      let body =  {
        "notification": {
            "title": "New Message from " + user + " !",
            "body": message,
            "icon": "/images/icon-3.png",
            "click_action": "https://friendlychat-3f1f3.web.app/"
            },
        "to": receiver
    }
    axios({
      method: 'post',
      url: 'https://fcm.googleapis.com/fcm/send',
      data: body,
      headers: config.headers
    });
  }
    });


    res.send({
      'status': "success",
      'message': message
    });
  });

app.listen(port);
console.log('Server started at http://localhost:' + port);