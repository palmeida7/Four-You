const controlUser = require('./control_users');

let user = {};

user.createUser = function (req, res) {
    let userName = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let userStatus =  controlUser.createUser(userName,email,password);
    let msg = 'User already exists.';
    if (userStatus == null){
        res.status(400).send({msg : msg});
    } else {
        res.status(200).send({user : userStatus});
    }
};

user.updateUser = function (req, res) {
    let id = req.body.id;
    let fullName = req.body.full_name;
    let proImg = req.body.pro_upload;
    let covImg = req.body.cover_upload;
    let bio = req.body.bio;
    let profileStatus = controlUser.createUser(id,fullName,proImg,covImg,bio);
    res.status(200).send({user : profileStatus});
};

module.exports = user;