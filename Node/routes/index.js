var express = require('express');
var router = express.Router();
var app = require('../app');



/* GET home page. */
router.get('/aliakber', function (req, res, next) {
  res.send(JSON.stringify('aliakber'));
});

router.get('/', function (req, res, next) {
  console.log(req.user);
  res.send('aliakber');
  console.log(req.isAuthenticated())
  res.render('index', { title: 'Express1' });
});


// router.post('/upload', upload.single('image'), (req, res) => {
//   console.log('i am call')
//   if (req.file)
//     res.json({
//       imageUrl: `images/uploads/${req.file.filename}`
//     });
//   else
//     res.status("409").json("No Files to Upload.");
// });

module.exports = router;
