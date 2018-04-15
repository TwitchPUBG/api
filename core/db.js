const assert = require("assert").strict;
const Sequelize = require("sequelize");
const config = require("config");
const path = require("path");
const fs = require("fs");

assert(config.has("pg.database") === true, "missing 'pg.database' config");
assert(config.has("pg.user") === true, "missing 'pg.user' config");
assert(config.has("pg.password") === true, "missing 'pg.password' config");

const sequelize = new Sequelize({
	host: config.get("pg.host"),
	port: config.get("pg.port"),
	database: config.get("pg.database"),
	username: config.get("pg.user"),
	password: config.get("pg.password"),
	dialect: "postgres"
});

const modelDirectory = path.join(__dirname, "..", "models");

function recursiveReaddirSync(modelsPath) {
	const files = fs.readdirSync(modelsPath);
	let list = [];
	let stats;

	files.forEach((file) => {
		stats = fs.lstatSync(path.join(modelsPath, file));

		if (stats.isDirectory()) {
			list = list.concat(recursiveReaddirSync(path.join(modelsPath, file)));
		} else {
			list.push(path.join(modelsPath, file));
		}
	});

	return list;
}

recursiveReaddirSync(modelDirectory)
	.filter((file) => {
		return (file.indexOf(".") !== 0) && (file !== "index.js");
	})
	.forEach((file) => {
		var model = sequelize.import(file);

		sequelize.models[model.name] = model;
	});

Object.keys(sequelize.models).forEach((modelName) => {
	if ("associate" in sequelize.models[modelName]) {
		sequelize.models[modelName].associate(sequelize.models);
	}
});

sequelize.authenticate()
.then(() => {
	console.log(`[Core/Database] Connected to the database`);
})
.catch((err) => {
	console.error(`[Core/Database] Error connecting to the database`, err);
});

module.exports = sequelize;
