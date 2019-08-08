let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let webpush = require('web-push');
let app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('This is a push notification server use post');
});

app.post('/subscribe', (req, res) => {
  console.log(req.body);
  let sub = req.body.sub;
  res.set('Content-Type', 'application/json');
  webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    "BBSQyMN_2WfRK6K-qz-FvihKdQkiIK8OM4p6bzNPIudOkA7uaxGUpKEI5I5zozLLyxbGFIjdSdDzDUZo3jTqYXA",
    "3ucTaxSB7JpvgDaDMKYEUEDV0KYxsiSU1Yd_FfDtTTE"
  );

  let payload = JSON.stringify({
    "notification": {
      "title": "Water Management System",
      "body": "Issue: " + req.body.data,
      "icon": "https://yt3.ggpht.com/a-/AAuE7mCxr-4W53FAxBRcKR0iDk_vPCSAmW-QKFGaFA=s88-mo-c-c0xffffffff-rj-k-no"
    }
  });

  Promise.resolve(webpush.sendNotification(sub, payload))
    .then(() => res.status(200).json({
      message: 'Notification sent'
    }))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
})

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
