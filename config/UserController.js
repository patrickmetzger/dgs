var path = require('path');

UserController = function() {};

UserController.prototype.uploadFile = function(req, res) {
    var uploadDir = path.join('../' + __dirname, '/uploads');
    console.log(req.files);
    console.log(uploadDir);
    /*
    var data = _.pick(req.body, 'type')
        , uploadPath = path.normalize('/public/imgs/uploads')
        , file = req.files.file;

        console.log(file.name); //original name (ie: sunset.png)
        console.log(file.path); //tmp path (ie: /tmp/12345-xyaz.png)
    	console.log(uploadPath); //uploads directory: (ie: /home/user/data/uploads)
    	*/
}

module.exports = new UserController();