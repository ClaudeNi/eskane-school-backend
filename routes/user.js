const router = require("express").Router();

const {
	getUsers,
	getUser,
	createUser,
	authUser,
	updateUser,
} = require("../controllers/user");

const {
	getClass,
	getClasses,
	getUserClasses,
	createClass,
	updateClass,
	deleteClass,
} = require("../controllers/class");

//GET Methods
router.get("/users", getUsers);
router.get("/classes", getClasses);
router.get("/classes/:userID", getUserClasses);
router.get("/classes/class/:classID", getClass);
router.get("/users/:userID", getUser);
//POST Methods
router.post("/users", createUser);
router.post("/classes", createClass);
router.post("/users/login", authUser);
//PATCH Methods
router.patch("/users/:userID", updateUser);
router.patch("/classes/class/:classID", updateClass);
//DELETE Methods
router.delete("/classes/:classID", deleteClass);

module.exports = router;
