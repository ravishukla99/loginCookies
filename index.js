const { parse } = require('cookie-parse')
const express = require('express')  
const path = require('path')
const helmet = require('helmet')
const cookieparse = require('cookie-parser')
const app = express()
app.use(helmet());
app.use(cookieparse());
app.use(express.json())
 app.use(express.urlencoded({extended: true}));
 app.set("view engine","ejs");
 app.set("views",path.join(__dirname,'views'));

 const PORT = 4000;

 app.get('/',(req,res)=>{
	 let username = req.cookies.username;
	 return res.render("home",{
		username
	 });
 });

 app.get('/login',(req,res)=>{
	let status =req.query.msg ? true : false;
	if(status){
		return res.render('login',{
			error:"Invalid details"
		})
	} 
	else{
		return res.render('login')
	}
 });

 app.get('/welcome',(req,res)=>{
    let username = req.cookies.username;
	return res.render('welcome',{username});
 })

 app.post('/process_login',(req,res)=>{
//    let { username , password} = req.body;             this is a short cut 

	let username = req.body.username;
	let password = req.body.username;

	//  dommy data
   let userdetails = {
	username : "Ravi",
	password : "mypwd" 
   };
   if (username === userdetails['username'] && password === userdetails['password']) {
	res.cookie('username', username );
	return res.redirect('/welcome');
   }
else{
	return res.redirect('login?msg=fail');
}
 })

 app.get('/logout',(req,res)=>{
	res.clearCookie('username');
	return res.redirect('/login')
 })
app.listen(PORT,()=>{
	console.log("server stated!")
})









