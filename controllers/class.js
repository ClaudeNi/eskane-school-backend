const classModel = require("../models/class");
const userModel = require("../models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const mongoose = require("mongoose");

async function createClass(req, res) {
	try {
		const newClass = await new classModel({ ...req.body }).save();
		const classID = newClass.id;
		res.status(201).send({
			classID: classID,
			message: "Created a new class successfully",
		});
	} catch (e) {
		res.status(500).send(e);
	}
}

async function getClass(req, res) {
	try {
		const classID = req.params.classID;
		const classData = await classModel.findById(classID);
		if (!classData) {
			return res.status(404).send(`This class does not exist.`);
		}
		res.send({
			data: classData,
			message: "Class found",
		});
	} catch (e) {
		res.status(500).send(e);
	}
}

async function getClasses(req, res) {
	try {
		const classesList = await classModel.find();
		if (!classesList) {
			return res.status(404).send(`Couldn't find any classes`);
		}
		res.send({
			data: classesList,
			message: "Classes found",
		});
	} catch (e) {
		res.status(500).send(e);
	}
}

async function getUserClasses(req, res) {
	try {
		const userID = req.params.userID;
		const user = await userModel.findById(userID);

		const classesList = await classModel.find();

		let newClassList = [];
		if (user.role === "Teacher" || user.role === "Student") {
			classesList.forEach((classData) => {
				if (
					classData.students.findIndex((x) => {
						return x.id.equals(new mongoose.Types.ObjectId(userID));
					}) !== -1 ||
					classData.teacher.id.equals(
						new mongoose.Types.ObjectId(userID)
					)
				) {
					newClassList.push(classData);
				}
			});
		} else {
			newClassList = classesList.slice(0);
		}

		if (!classesList) {
			return res
				.status(404)
				.send(`This user hasn't joined any classes yet`);
		}
		res.send({
			data: newClassList,
			message: "Classes Data found",
		});
	} catch (e) {
		res.status(500).send(e);
	}
}

async function updateClass(req, res) {
	try {
		const classID = req.params.classID;
		const classData = await classModel.findById(classID);

		if (!classData) {
			return res.status(404).send(`This class does not exist!`);
		}

		const newClassData = req.body;

		await classModel.findByIdAndUpdate(classID, newClassData);

		res.status(200).send({ message: "Class Updated" });
	} catch (e) {
		res.status(500).send(e);
	}
}

async function deleteClass(req, res) {}

module.exports = {
	getClass,
	getClasses,
	getUserClasses,
	createClass,
	updateClass,
	deleteClass,
};
