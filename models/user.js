const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: {
		type: String,
		required: true,
		unique: true,
		validator: function (value) {
			if (!validator.isEmail(value)) {
				throw new Error(`${value} is not an Email...`);
			}
		},
	},
	phoneNumber: { type: String, required: true, unique: true, unique: true },
	role: { type: String, required: true },
	password: { type: String, required: true },
	classes: [mongoose.Schema.Types.ObjectId],
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY);
	return token;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
