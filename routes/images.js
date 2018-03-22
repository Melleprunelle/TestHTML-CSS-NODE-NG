var express = require('express');
var path = require('path');
var router = express.Router();

var fs = require('fs');
var sizeOf = require('image-size');

/* GET users listing. */
router.get(3000, function(next) {
  var imagePath = path.join(__dirname, '../public/images');
  fs.readdir(imagePath, function(err, files){
    if(err) res.status(400).send({type:"remote", component:"imageController", value:err});
    else
    {
      var images = [];
      for (var i=0; i<files.length; i++) {
        var file = files[i];
        var dimensions = sizeOf(path.join(imagePath,file));
        images.push({name:file, width:dimensions.width, height:dimensions.height});
        console.log(file);
      }
      res.send(images);
    }
  });
});

var app = express();

app.get('public/javascripts/rhtest.js', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
module.exports = router;
