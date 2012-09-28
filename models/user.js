
/**
 * model
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name : {type:String , index: true},
	loginname:{type:String, unique:true},
	email : {type:String , unique: true},
	password : { type : String },
	profile : { type : String },
	profile_image_url :{ type: String },
	url : { type : String },
	weibo : { type : String },
	avatar : { type : String }
});

mongoose.model('User',userSchema);