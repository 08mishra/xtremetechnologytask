require('dotenv').config();

const express = require('express');
const mongoose= require('mongoose');
const ejs= require('ejs');
const _ = require('lodash');
const bodyParser= require('body-parser');
const path = require('path');
const app = express();

const bcrypt= require('bcrypt');

app.use(express.static('./Public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

 
mongoose.connect("mongodb+srv://admin-prashant:852000@cluster0.fp9pt.mongodb.net/userDB", { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema=  {
    name:String,
    phone:String,
    email:String, 
    password: String
};

const user = new mongoose.model("Users", userSchema);

app.get("/", (req, res)=>{
    res.sendFile(path.resolve(__dirname, './Public/Register.html'));
})







app.get("/login", (req, res)=>{
    res.sendFile(path.resolve(__dirname, './Public/Login.html'));
})


app.get("/secret", (req, res)=>{
    res.json({status:true, message:"You will be a good person one day!"});
})

app.post("/register", async(req, res)=>{
   

     bcrypt.hash(req.body.password, 10, function(err, hash) {
        const User = new user({
            name:req.body.name,
            phone:req.body.phone,
            email: req.body.email,
            password: hash
        });
        
    User.save((err)=>{
        if(!err){
             
            res.render("secret", {user: User});
        }
    })
    });
     
 
})





app.post("/login", (req, res)=>{
     
    
    user.findOne({email: req.body.email}, (err, User)=>{
        if(err){
            console.log(err);
        }else if(User){
            bcrypt.compare(req.body.password, User.password, function(err, result) {
                if(result){
                    res.render("secret", {user:User});
                }else{
                    res.redirect("/");
                }
            });
             
        }
    })
})
 


app.listen(process.env.PORT || 8000, ()=>{
    console.log("sever is runing on port 8000");
})