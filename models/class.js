const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
	name: { type: String, required: true },
	teacher: {
		id: mongoose.Schema.Types.ObjectId,
		firstName: String,
		lastName: String,
	},
	students: [
		{
			id: mongoose.Schema.Types.ObjectId,
			firstName: String,
			lastName: String,
			role: String,
		},
	],
});

const Class = mongoose.model("class", classSchema);

module.exports = Class;
