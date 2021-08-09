const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username:{
		type:String,
		required:true,
		trim:true
	},
	email:{
		type:String,
		required:true,
		trim:true		
	},
	password:{
		type:String,
		required:true,
		trim:true		
	},
	role:{
		type:Number,
		default:0
	}
},{
	timestamps:true
});

module.exports = mongoose.model('user',userSchema);