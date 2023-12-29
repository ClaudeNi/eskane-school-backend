const userModel = require("../models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");
const router = require("express").Router();

async function createUser(req, res) {
	console.log(req.body);
	try {
		const user = await userModel.findOne({ email: req.body.email });
		if (user) {
			return res
				.status(400)
				.send({ message: "User with given email already exists" });
		}
		const newUser = await new userModel(req.body);

		if (!validator.isEmail(newUser.email)) {
			return res
				.status(400)
				.send({ message: `${newUser.email} is not a valid email` });
		}

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPass = await bcrypt.hash(req.body.password, salt);

		await new userModel({ ...req.body, password: hashPass }).save();
		res.status(201).send({ message: "Created a new user successfully" });
	} catch (e) {
		res.status(500).send(e);
	}
}

async function authUser(req, res) {
	try {
		const user = await userModel.findOne({ email: req.body.email });
		if (!user) {
			return res
				.status(400)
				.send({ message: "Invalid Email or Password" });
		}
		const validPass = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPass) {
			return res
				.status(400)
				.send({ message: "Invalid Email or Password" });
		}
		const token = user.generateAuthToken();
		const id = user.id;
		console.log(id);
		res.status(200).send({
			data: token,
			id: id,
			message: "Logged Successfully",
		});
	} catch (e) {
		res.status(500).send(e);
	}
}

async function getUsers(req, res) {
	try {
		const users = await userModel.find();
		if (!users) {
			return res.status(404).send(`No users found`);
		}
		res.send({
			data: users,
			message: "Users found",
		});
	} catch (e) {
		res.status(500).send(e);
	}
}

async function getUser(req, res) {
	const userID = req.params.userID;
	try {
		const user = await userModel.findById(userID);
		if (!user) {
			return res.status(404).send(`No user with id ${userID} was found`);
		}
		res.send({
			data: {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				phoneNumber: user.phoneNumber,
				role: user.role,
			},
			message: "User found",
		});
	} catch (e) {
		res.status(500).send(e);
	}
}

async function updateUser(req, res) {
	const userID = req.params.userID;
	const data = req.body;
	try {
		await userModel.findByIdAndUpdate(userID, data);
		res.send({ message: "User successfully updated." });
	} catch (e) {
		res.status(500).send(e);
	}
}

module.exports = {
	getUsers,
	getUser,
	createUser,
	authUser,
	updateUser,
};
