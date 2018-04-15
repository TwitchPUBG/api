require("dotenv").config();
const config = require("config");

module.exports = {};
["development", "test", "production"].forEach((env) => {
	module.exports[env] = {
		username: config.get("pg.user"),
		password: config.get("pg.password"),
		database: config.get("pg.database"),
		host: config.get("pg.host"),
		port: config.get("pg.port"),
		dialect: "postgres"
	};
});