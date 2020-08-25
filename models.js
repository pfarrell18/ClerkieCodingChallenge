/* Contains all models for incorrect.js */

const
	mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	uri ="mongodb+srv://user:priyanka@cluster0.98ovz.gcp.mongodb.net/clerkie?retryWrites=true&w=majority"
	connection = mongoose.createConnection(uri, {useUnifiedTopology: true, useNewUrlParser: true});

module.exports.mongoose = mongoose;

let userSchema = new Schema({
	active: {type: Boolean, default: true},
	paid: Boolean,
	signup_date: Date,

	created: {type: Date, default: Date.now},
	updated: {type: Date, default: Date.now},
});
module.exports.user = connection.model("User", userSchema);


let paymentSchema = new Schema({
	name: String,
	active: {type: Boolean, default: true},
	amount: Number,
	date: Date,
	user: {type: Schema.Types.ObjectId, ref: "User"},

	created: {type: Date, default: Date.now},
	updated: {type: Date, default: Date.now},
});
module.exports.payment = connection.model("Payment", paymentSchema);