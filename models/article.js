
/**
 * model
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var articleSchema = new Schema({
	title : { type: String },
	content : { type: String },
	pub_author_id : { type: ObjectId },
	visit_count : { type: Number , default:0 },
	create_date : { type: Date , default: Date.now },
	update_date : { type: Date , default: Date.now },
	favor : { type : Number , default:0 }
	/*content_is_html : { type: Boolean }*/
});

mongoose.model('Article' , articleSchema);