const classModel = require("../models/class");
const validator = require("validator");
const bcrypt = require("bcrypt");
const router = require("express").Router();

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
		const classID = req.param.classID;
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

async function getUserClasses(req, res) {
	try {
		const userID = req.body.userID;
		const classesList = await classModel.find(userID);
		if (!classesList) {
			return res
				.status(404)
				.send(`This user hasn't joined any classes yet`);
		}
		res.send({
			data: classesList,
			message: "Classes found",
		});
	} catch (e) {
		res.status(500).send(e);
	}
}

async function updateClass(req, res) {}

async function deleteClass(req, res) {}

module.exports = {
	getClass,
	getUserClasses,
	createClass,
	updateClass,
	deleteClass,
};
