const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
	name: { type: String, required: true },
	teacher: mongoose.Schema.Types.ObjectId,
	students: [
		{
			id: mongoose.Schema.Types.ObjectId,
			firstName: String,
			lastName: String,
		},
	],
});

const Class = mongoose.model("class", classSchema);

module.exports = Class;
