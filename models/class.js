const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
	name: { type: String, required: true },
	teacher: {
		type: String,
		required: true,
	},
	students: { type: Array, required: true },
});

const Class = mongoose.model("class", classSchema);

module.exports = Class;
