const express = require('express');
const axios = require('axios');
const db = require('./models/index.js');

const app = express();
const port = process.env.PORT || 5000;

// routes will go here



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

    const body =  {
        "notification": {
            "title": "New Message!",
            "body": message,
            "icon": "/images/profile_placeholder.png",
            "click_action": "https://iic3585-2021.github.io/pwa-grupo9/"
            },
        "to": "c98HE2TinSFUn4BWKEhDrq:APA91bElPvHm0FFEMgeea8aq5A9VHG2i6pPd_NHXuT541TEdaBg2wOKREmyIi32ucTsEgMP-VDLKOK_hSWOahzhZ0NhzOZvE5PfLFiK9LfoQFxB6frUpzXxZRLk91Qz_zR1Oy-d-3ZYg"
    }

    axios({
        method: 'post',
        url: 'https://fcm.googleapis.com/fcm/send',
        data: body,
        headers: config.headers
      });
  
    res.send({
      'status': "success",
      'message': message
    });
  });

app.listen(port);
console.log('Server started at http://localhost:' + port);