const Admin = require('../models/Adminmodel');

const path = require('path');

const fs = require('fs');
const { model } = require('mongoose');

module.exports.index = (req,res) =>{
    return res.render('index');
}

module.exports.insertdata = (req,res) => {
    Admin.uploadAvatar(req,res,(err)=>{//uploadfiles
        let avatar = "";
        if(err){
            console.log("File not Upload");
            return false;
        }else{
            if(req.file){ //req.files
                avatar = Admin.uploadPath+'/'+req.file.filename; // path in avatar
            }else{
                console.log("Files not Founds");
                return false;
            }
            Admin.create({
                S_name : req.body.name,
                S_email : req.body.email,
                S_password : req.body.password,
                S_phone : req.body.phone,
                avatar : avatar
            },(err,data)=>{
                if(err){
                    console.log("Data Not Inserted");
                    return false;
                }else{
                    console.log("Data Insert Successfully");
                    return res.redirect('back');
                }  
            });
        }
    });   
}

module.exports.viewdata =  (req,res) =>{
    Admin.find({},(err,viewdata) => {
        if(err){
            console.log("Data Not Show");
            return false;
        }
        return res.render('view',{
            record : viewdata
        });
    });
}

module.exports.deletedata  =  (req,res) =>{
    let id = req.query.id;
    console.log(id);
     Admin.findById(id,(err,deletedata)=>{
        if(err){
            console.log("File Not Delete In Folder");
            return false;
        }
        console.log(deletedata.avatar);
        if(deletedata.avatar){
           fs.unlinkSync(path.join(__dirname,'../',deletedata.avatar)); // id to delete in avatar
        }
        Admin.findByIdAndDelete(id,(err,data)=>{
            if(err){
                console.log("Data Not Delete");
                return false;
            }else{
                console.log("Data successfully Delete");
                return res.redirect('back');
            }
        });
    });   
}

module.exports.editdata =  (req,res) =>{
        let id = req.params.id;
        console.log(id);
         Admin.findById(id,(err,editdata)=>{
            if(editdata){
                 return res.render('edit',{
                     single : editdata
                 });
             }else{
                 console.log("Edit Data Not Found");
                 return false;
             }
         });
}

module.exports.upadateData =  (req,res) =>{
    Admin.uploadAvatar(req,res,(err)=>{
        if(err){
            console.log("File Not Upadete");
            return false;
        } 
        let edit_id = req.body.edit_id;
        if(req.file){
            Admin.findById(edit_id,(err,edata)=>{
                if(err){
                    console.log("Image Not Founds");
                    return false;
                }
                if(edata.avatar){
                    fs.unlinkSync(path.join(__dirname,'../',edata.avatar));
                }
                let avatar = Admin.uploadPath+"/"+req.file.filename;
                Admin.findByIdAndUpdate(edit_id,{
                   S_name : req.body.name,
                   S_email : req.body.email,
                   S_password : req.body.password,
                   S_phone : req.body.phone,
                   avatar : avatar
               },(err,upadatedate)=>{
                   if(upadatedate){
                       console.log("Successfully Data Upadte");
                       return res.redirect('/admin/viewdata');
                   }else{
                       console.log("Data Not Upadate");
                       return false
                   }
               });
            });
        }else{
            Admin.findById(id,(err,updata)=>{
                if(err){
                    console.log("Id Not Founds");
                    return false;
                }
                let avatar = updata.avatar;
                Admin.findByIdAndUpdate(id,{
                    S_name : req.body.name,
                    S_email : req.body.email,
                    S_password : req.body.password,
                    S_phone : req.body.phone,
                    avatar : avatar
                },(err,udata)=>{
                    if(err){
                        console.log("Record Not Update");
                        return false;
                    }
                    console.log("Record Successfully Update");
                    return res.redirect('/admin/viewdata');
                });
            });
        }
    });
}