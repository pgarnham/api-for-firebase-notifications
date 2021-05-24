const express = require('express');
const axios = require('axios');
const db = require('./models/index.js');

const { Client } = require('pg');



const app = express();
const port = process.env.PORT || 5000;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect();

// routes will go here

app.get('/', function(req, res) {
  res.send("Hi, this is a Express API");
});

var tokens = []

app.post('/new-user', function(req, res) {
    const newToken = req.body.token
  
    tokens.push(newToken);

  });




let config = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": "key= AAAAnsO9YbA:APA91bHN4Iyw0TnjZcXmxTa0YVwm9LV-vdLlbB621AklmH4mFXXYslggJuidldlvRAnP-R03Iz2uqomfqs02L63npHJIMb3Zbt1tJltLmlyasSz7yAzb356ldNAMLE2wBoNkdipLCJ8D"
    }
  }



app.post('/send-message', function(req, res) {
    const message = req.body.message;
    const senderToken = req.body.message;

    
    tokens.forEach(receiver => {
      if (receiver != senderToken) {
      let body =  {
        "notification": {
            "title": "New Message!",
            "body": message,
            "icon": "/images/profile_placeholder.png",
            "click_action": "https://iic3585-2021.github.io/pwa-grupo9/"
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