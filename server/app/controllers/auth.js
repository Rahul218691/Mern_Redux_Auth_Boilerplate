const User = require('../models/user');
const {hashPassword,comparePassword} = require('../../utils/hashing');
const jwt = require('jsonwebtoken');


const createUser = async(req,res) =>{
	try {
		const {username,email,password} = req.body;
		const emailExists = await User.findOne({email});
		if(emailExists) return res.status(400).json({msg:'User with this email already exists'});
		const hashData = await hashPassword(password);
		const newUser = await User.create({
			username,
			email,
			password:hashData
		});
		if(newUser){
			const access_token = createAccesToken({id:newUser._id});
			const refresh_token = createRefreshToken({id:newUser._id});
			res.cookie('refreshtoken',refresh_token,{
				httpOnly:true,
				path:'/api/refresh_token',
				maxAge:30*24*60*60*1000
			});
			res.json({
				msg:'Register Success!',
				access_token,
				user:{
					...newUser._doc,
					password:''
				}
			})						
		}
	} catch(error) {
		return res.status(500).json({msg:error.message})
	}
}


const logUser = async(req,res) =>{
	try {
		const {email,password} = req.body;
		const user = await User.findOne({email});
		if(!user) return res.status(400).json({msg:'User with this email not found'});
		const isMatch = await comparePassword(password,user.password);
		if(!isMatch) return res.status(400).json({msg:'Invalid user credentials'});
		const access_token = createAccesToken({id:user._id});
		const refresh_token = createRefreshToken({id:user._id});
		res.cookie('refreshtoken',refresh_token,{
			httpOnly:true,
			path:'/api/refresh_token',
			maxAge:30*24*60*60*1000			
		});
		res.json({
			msg:'Login Success',
			access_token,
			user:{
				...user._doc,
				password:''
			}
		});
	} catch(error) {
		return res.status(500).json({msg:error.message})
	}
}


const logout = async(req,res) =>{
		try {
			res.clearCookie('refreshtoken',{
				path:'/api/refresh_token'
			});
			return res.json({
				msg:'Logged Out!'
			})			
		} catch(error) {
			return res.status(500).json({msg:error.message})
		}	
}

const generateAccessToken = async(req,res) =>{
		try {
			const rf_token = req.cookies.refreshtoken;
			if(!rf_token) return res.status(400).json({msg:"Please Login to Continue"});
			jwt.verify(rf_token,process.env.JWT_REFRESH_TOKEN,async(err,result) =>{
				if(err) return res.status(400).json({msg:err.message});
				const user = await User.findById(result.id).select('-password')
				if(!user) return res.status(400).json({msg:"User does not exists"});
				const access_token = createAccesToken({id:result.id})
				res.json({
					access_token,
					user
				})
			})
		} catch(error) {
			return res.status(500).json({msg:error.message})
		}	
}


const createAccesToken = (payload) =>{
	return jwt.sign(payload,process.env.JWT_ACCESS_TOKEN,{expiresIn:'1d'})
}

const createRefreshToken = (payload) =>{
	return jwt.sign(payload,process.env.JWT_REFRESH_TOKEN,{expiresIn:'30d'})
}


module.exports = {
	createUser,
	logUser,
	logout,
	generateAccessToken,
}