const express = require('express');
const axios = require('axios');
const db = require('./models/index.js');

const app = express();
const port = process.env.PORT || 5000;

// routes will go here

app.get('/', function(req, res) {
  res.send("Hi, this is a Express API");
});



app.post('/new-user', function(req, res) {
    const newToken = req.body.token
  
    urlShortener.short(url, function(err, fcmToken) {
      db.fcmtoken.findOrCreate({where: {token: newToken}})
      .then(([urlObj, created]) => {
        res.send(fcmToken)
      });
    });
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

    const tokens = db.fcmtoken.findAll({where: {token: {[Op.notLike]: senderToken}}});
    
    tokens.forEach(receiver => {
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
    });


    res.send({
      'status': "success",
      'message': message
    });
  });

app.listen(port);
console.log('Server started at http://localhost:' + port);