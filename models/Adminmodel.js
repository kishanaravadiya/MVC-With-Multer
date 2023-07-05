const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const AVATAR_PATH = path.join('/uploads/images');

const AdminSchema = mongoose.Schema({
    S_name : {
        type : String,
        required : true
    },
    S_email : {
        type : String,
        required : true
    },
    S_password : {
        type : String,
        required : true
    },
    S_phone : {
        type :  Number,
        required : true,
    },
    avatar : {
        type : String,
        required : true
    }
});

const userstorage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,path.join(__dirname,'..',AVATAR_PATH));;
    },
    filename : (req,file,cb) =>{
        cb(null,file.fieldname+"-"+Date.now());
    }
});

AdminSchema.statics.uploadAvatar = multer({storage : userstorage}).single('avatar');
AdminSchema.statics.uploadPath = AVATAR_PATH;

const Admin = mongoose.model('studentavatbl',AdminSchema);
module.exports = Admin;