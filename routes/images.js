var express = require('express');
var path = require('path');
var router = express.Router();

var fs = require('fs');
var sizeOf = require('image-size');


/* GET users listing. */
router.get('/', function(req, res, next) {
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

module.exports = router;
