const mongoose = require("mongoose");

module.exports = () => {
	try {
		mongoose.connect(process.env.DB);
		console.log("Connected to Database successfully");
	} catch (error) {
		console.log(error);
		console.log("Couldnt connect");
	}
};
